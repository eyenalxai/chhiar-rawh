"use client"

import { Post } from "@/components/post/post"
import { getPostsClient } from "@/lib/fetch/client/posts"
import { cn } from "@/lib/utils"
import type { PostsType } from "@/types/reddit"
import { useQuery } from "@tanstack/react-query"

type PostsProps = {
	type: PostsType
}

export const Posts = ({ type }: PostsProps) => {
	const { data: newPosts } = useQuery({
		queryKey: [type],
		queryFn: () => getPostsClient({ type })
	})

	if (!newPosts) return null

	return (
		<div className={cn("flex", "flex-col", "gap-2", "w-full", "items-center")}>
			{newPosts.data.children.map((post) => (
				<Post key={post.data.title} data={post.data} />
			))}
		</div>
	)
}
