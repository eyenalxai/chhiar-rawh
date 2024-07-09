import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth"
import { cn } from "@/lib/utils"

export default async function Home() {
	return (
		<div className={cn("w-full", "flex", "justify-center", "mt-24")}>
			<form
				action={async () => {
					"use server"
					await signIn("reddit", {
						redirectTo: "/"
					})
				}}
			>
				<Button type={"submit"}>Sign in with Reddit</Button>
			</form>
		</div>
	)
}
