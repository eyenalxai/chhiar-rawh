import { accounts, db, users } from "@/lib/schema"
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
			if (user && account) {
				console.log("user", user)
				console.log("account", account)
				const [userModel] = await db
					.insert(users)
					.values({
						username: user.name as string
					})
					.returning()
					.onConflictDoUpdate({
						target: users.username,
						set: {
							username: user.name as string
						}
					})

				console.log("userModel", userModel)

				await db
					.insert(accounts)
					.values({
						userId: userModel.id,
						refresh_token: account.refresh_token,
						access_token: account.access_token,
						expires_at: account.expires_at
					})
					.onConflictDoUpdate({
						target: accounts.userId,
						set: {
							refresh_token: account.refresh_token,
							access_token: account.access_token,
							expires_at: account.expires_at
						}
					})
			}
			return token
		},

		async session({ session, token }) {
			console.log("session", session)
			return {
				...session,
				id: token.id
			}
		}
	}
})
