import { env } from "@/lib/env"
import { accounts, db, users } from "@/lib/schema"
import type { JWT } from "@auth/core/jwt"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"

interface RedditAccessTokenResponse {
	access_token: string
	expires_in: number
}

async function refreshAccessToken(refreshToken: string) {
	return fetch("https://www.reddit.com/api/v1/access_token", {
		method: "POST",
		headers: new Headers({
			Authorization: `Basic ${btoa(`${env.AUTH_REDDIT_ID}:${env.AUTH_REDDIT_SECRET}`)}`,
			"Content-Type": "application/x-www-form-urlencoded"
		}),
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken
		})
	})
		.then((response) => response.json() as unknown as RedditAccessTokenResponse)
		.catch((error) => {
			throw new Error(error)
		})
}

type AuthToken = {
	userId: string
	username: string
	accessToken: string
	accessTokenExpiresIn: number
} & JWT

const tokenHasExpiredWithEpoch = (expiresInEpoch: number) => {
	return Date.now() > expiresInEpoch * 1000
}

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
			console.log("jwt was called")

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
				console.log("token has expired")
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
			console.log("session was called")
			return { ...session, ...token }
		}
	}
})
