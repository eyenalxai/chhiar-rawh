import { Post } from "@/components/post/post"
import { auth } from "@/lib/auth"
import { getNewPostsServer } from "@/lib/fetch/server/posts"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function Page() {
	const session = await auth()

	if (!session) return redirect("/sign-in")

	const newPosts = await getNewPostsServer({ accessToken: session.accessToken })

	return (
		<div className={cn("flex", "flex-col", "gap-2", "w-full", "items-center", "mt-12")}>
			{newPosts.data.children.map((post) => (
				<Post key={post.data.title} data={post.data} />
			))}
		</div>
	)
}
