import { Post } from "@/components/post/post"
import { auth } from "@/lib/auth"
import { getNewPosts } from "@/lib/fetch/posts"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"

export default async function Page() {
	const session = await auth()

	if (!session) return redirect("/sign-in")

	const hotPosts = await getNewPosts({ accessToken: session.accessToken })

	return (
		<div className={cn("flex", "flex-col", "gap-2", "w-full", "items-center", "mt-12")}>
			{hotPosts.data.children.map((post) => (
				<Post key={post.data.title} data={post.data} />
			))}
		</div>
	)
}
