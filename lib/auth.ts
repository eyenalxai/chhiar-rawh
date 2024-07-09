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
		async jwt(stuff) {
			console.log("token", stuff.token)
			console.log("user", stuff.user)
			console.log("account", stuff.account)
			return stuff.token
		},

		async session({ session, token }) {
			return {
				...session,
				id: token.id
			}
		}
	}
})
