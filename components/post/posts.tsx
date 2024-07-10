"use client"

import { Post } from "@/components/post/post"
import { getNewPostsClient } from "@/lib/fetch/client/posts"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

export const Posts = () => {
	const { data: newPosts } = useQuery({
		queryKey: ["new"],
		queryFn: () => getNewPostsClient()
	})

	if (!newPosts) return null

	return (
		<div className={cn("flex", "flex-col", "gap-2", "w-full", "items-center", "mt-12")}>
			{newPosts.data.children.map((post) => (
				<Post key={post.data.title} data={post.data} />
			))}
		</div>
	)
}
