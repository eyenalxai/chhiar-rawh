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
			console.log("jwt was called")
			console.log("user", user)
			console.log("account", account)

			if (user && account) {
				return {
					username: user.name as string,
					accessToken: account.access_token as string,
					accessTokenExpiresAt: account.expires_at as number,
					...token
				}
			}

			return { ...token }
		},

		async session({ session, token }) {
			return { ...session, ...token }
		}
	}
})
