import { auth, signIn, signOut } from "@/lib/auth"

export default async function Home() {
	const session = await auth()

	return (
		<div>
			{session && (
				<div>
					<p>Signed in as {session.username} </p>
					<p>Access Token: {session.accessToken}</p>
					<p>Access Token Expires At: {session.accessTokenExpiresAt}</p>
				</div>
			)}
			<form
				action={async () => {
					"use server"
					await signIn("reddit")
				}}
			>
				<button type="submit">Sign In</button>
			</form>
			<form
				action={async () => {
					"use server"
					await signOut()
				}}
			>
				<button type="submit">Sign Out</button>
			</form>
		</div>
	)
}
