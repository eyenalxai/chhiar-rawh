import { accounts, db, users } from "@/lib/schema"
import { isTokenExpired, refreshAccessToken } from "@/lib/token"
import type { AuthToken } from "@/types/token"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		{
			id: "reddit",
			name: "Reddit",
			type: "oauth",
			authorization: "https://www.reddit.com/api/v1/authorize?scope=identity&duration=permanent",
			token: "https://www.reddit.com/api/v1/access_token",
			userinfo: "https://oauth.reddit.com/api/v1/me",
			checks: ["state"],
			style: {
				brandColor: "#FF4500"
			}
		}
	],
	callbacks: {
		async jwt({ user, account, token }) {
			const authToken = token as AuthToken

			if (user && account) {
				const [userModel] = await db
					.insert(users)
					.values({
						username: user.name as string
					})
					.onConflictDoUpdate({
						target: users.username,
						set: {
							username: user.name as string
						}
					})
					.returning()

				await db
					.insert(accounts)
					.values({
						userId: userModel.id,
						refresh_token: account.refresh_token as string,
						access_token: account.access_token as string,
						expires_at: account.expires_at as number
					})
					.onConflictDoUpdate({
						target: accounts.userId,
						set: {
							refresh_token: account.refresh_token,
							access_token: account.access_token,
							expires_at: account.expires_at
						}
					})
					.returning()

				return {
					userId: userModel.id,
					username: user.name as string,
					accessToken: account.access_token as string,
					accessTokenExpiresAt: account.expires_at as number
				} satisfies AuthToken
			}

			if (isTokenExpired(authToken.accessTokenExpiresAt)) {
				console.log("Refreshing access token")
				const [accountModel] = await db.select().from(accounts).where(eq(accounts.userId, authToken.userId))
				const refreshedTokenResponse = await refreshAccessToken(accountModel.refresh_token)

				const [updatedAccountModel] = await db
					.update(accounts)
					.set({
						access_token: refreshedTokenResponse.access_token,
						expires_at: refreshedTokenResponse.expires_in + Math.floor(Date.now() / 1000)
					})
					.where(eq(accounts.userId, authToken.userId))
					.returning()

				return {
					...authToken,
					accessToken: updatedAccountModel.access_token,
					accessTokenExpiresAt: updatedAccountModel.expires_at
				} satisfies AuthToken
			}

			return authToken
		},

		async session({ session, token }) {
			const authToken = token as AuthToken
			return { ...session, ...authToken }
		}
	}
})
