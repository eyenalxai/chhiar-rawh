"use client"

import { Post } from "@/components/post/post"
import { getPostsClient } from "@/lib/fetch/client/posts"
import { cn } from "@/lib/utils"
import type { PostsType, RedditListingObj, RedditPostObj } from "@/types/reddit"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

type PostsProps = {
	type: PostsType
}

export const Posts = ({ type }: PostsProps) => {
	const { ref, inView } = useInView()

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

	useEffect(() => {
		if (inView) {
			fetchNextPage().catch((error) => {
				console.error("Error fetching next page:", error)
			})
		}
	}, [inView, fetchNextPage])

	if (!postsPages) return null

	return (
		<div className={cn("flex", "flex-col", "gap-2", "w-full", "items-center")}>
			{postsPages.pages.map((page, pageIdx) =>
				page.data.children.map((post, postIdx) => {
					if (pageIdx === postsPages.pages.length - 1 && postIdx === page.data.children.length - 3) {
						return <Post key={post.data.title} data={post.data} ref={ref} />
					}
					return <Post key={post.data.title} data={post.data} />
				})
			)}
		</div>
	)
}
