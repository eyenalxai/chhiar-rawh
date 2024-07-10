import { PostContent } from "@/components/post/post-content"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { RedditPostData } from "@/types/reddit"
import { forwardRef } from "react"

type PostProps = {
	data: RedditPostData
}

export const Post = forwardRef<HTMLDivElement, PostProps>(({ data }, ref) => {
	return (
		<Card className={cn("w-full", "max-w-md", "p-4")} ref={ref}>
			{data.crosspost_parent_list && data.crosspost_parent_list.length > 0 ? (
				<PostContent data={data.crosspost_parent_list[0]} />
			) : (
				<PostContent data={data} />
			)}
		</Card>
	)
})
Post.displayName = "Post"
