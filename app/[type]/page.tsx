import { Posts } from "@/components/post/posts"
import { auth } from "@/lib/auth"
import { getPostsServer } from "@/lib/fetch/server/posts"
import type { PostsType } from "@/types/reddit"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: { type: string } }) {
	const session = await auth()

	if (!session) redirect("/sign-in")

	const queryClient = new QueryClient()

	const type = params.type as PostsType

	if (type !== "hot" && type !== "new" && type !== "best" && type !== "top" && type !== "rising") redirect("/hot")

	await queryClient.prefetchQuery({
		queryKey: [type],
		queryFn: () => getPostsServer({ accessToken: session.accessToken, type: type })
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Posts type={type} />
		</HydrationBoundary>
	)
}
