import { Posts } from "@/components/post/posts"
import { auth } from "@/lib/auth"
import { getNewPostsServer } from "@/lib/fetch/server/posts"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { redirect } from "next/navigation"

export default async function Page() {
	const session = await auth()

	if (!session) return redirect("/sign-in")

	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["new"],
		queryFn: () => getNewPostsServer({ accessToken: session.accessToken })
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Posts />
		</HydrationBoundary>
	)
}
