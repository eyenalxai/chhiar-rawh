import { Posts } from "@/components/post/posts"
import { auth } from "@/lib/auth"
import { getPostsServer } from "@/lib/fetch/server/posts"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { redirect } from "next/navigation"

export default async function Page() {
	const session = await auth()

	if (!session) redirect("/sign-in")

	const queryClient = new QueryClient()

	const type = "rising"

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
