import { auth, signIn, signOut } from "@/lib/auth"

export default async function Home() {
	const session = await auth()

	return (
		<div>
			{JSON.stringify(session)}
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
