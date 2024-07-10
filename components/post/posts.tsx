"use client"

import { Post } from "@/components/post/post"
import { Button } from "@/components/ui/button"
import { getPostsClient } from "@/lib/fetch/client/posts"
import { cn } from "@/lib/utils"
import type { PostsType, RedditListingObj, RedditPostObj } from "@/types/reddit"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"

type PostsProps = {
	type: PostsType
}

export const Posts = ({ type }: PostsProps) => {
	const queryClient = useQueryClient()

	const { data: postsPages, fetchNextPage } = useInfiniteQuery({
		queryKey: [type, "infinite"],
		queryFn: ({ pageParam }) => getPostsClient({ type, ...(pageParam ? { after: pageParam } : {}) }),
		initialPageParam: undefined as string | undefined,
		getNextPageParam: (lastPage) => lastPage.data.after,
		initialData: () => {
			const queryCacheData = queryClient.getQueryState([type])?.data as RedditListingObj<RedditPostObj> | undefined
			if (queryCacheData) {
				return {
					pages: [queryCacheData],
					pageParams: [undefined],
					pageCount: 1
				}
			}
		}
	})

	console.log("postsPages", postsPages)

	if (!postsPages) return null

	return (
		<div className={cn("flex", "flex-col", "gap-2", "w-full", "items-center")}>
			{postsPages.pages.map((page) =>
				page.data.children.map((post) => <Post key={post.data.title} data={post.data} />)
			)}
			<Button onClick={() => fetchNextPage()}>Load More</Button>
		</div>
	)
}
