import { accounts, db, users } from "@/lib/schema"
import { refreshAccessToken, tokenHasExpiredWithEpoch } from "@/lib/token"
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
						expires_in: account.expires_in as number
					})
					.onConflictDoUpdate({
						target: accounts.userId,
						set: {
							refresh_token: account.refresh_token,
							access_token: account.access_token,
							expires_in: account.expires_in
						}
					})
					.returning()

				return {
					userId: userModel.id,
					username: user.name as string,
					accessToken: account.access_token as string,
					accessTokenExpiresIn: account.expires_in as number
				} satisfies AuthToken
			}

			if (tokenHasExpiredWithEpoch(authToken.accessTokenExpiresIn)) {
				const [accountModel] = await db.select().from(accounts).where(eq(accounts.userId, authToken.userId))
				const refreshedTokenResponse = await refreshAccessToken(accountModel.refresh_token)

				const [updatedAccountModel] = await db
					.update(accounts)
					.set({
						access_token: refreshedTokenResponse.access_token,
						expires_in: refreshedTokenResponse.expires_in
					})
					.where(eq(accounts.userId, authToken.userId))
					.returning()

				return {
					...authToken,
					accessToken: updatedAccountModel.access_token,
					accessTokenExpiresIn: updatedAccountModel.expires_in
				} satisfies AuthToken
			}

			return authToken
		},

		async session({ session, token }) {
			return { ...session, ...token }
		}
	}
})
