import { auth } from "@/lib/auth"
import { getHotPosts } from "@/lib/fetch/posts"
import { redirect } from "next/navigation"

export default async function Page() {
	const session = await auth()

	if (!session) return redirect("/sign-in")

	const hotPosts = await getHotPosts({ accessToken: session.accessToken })
	console.log(hotPosts.data)

	return (
		<div>
			{hotPosts.data.children.map((post) => (
				<div key={post.data.title}>{post.data.title}</div>
			))}
		</div>
	)
}
