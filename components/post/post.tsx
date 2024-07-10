import { PostContent } from "@/components/post/post-content"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { RedditPostData } from "@/types/reddit"

type PostProps = {
	data: RedditPostData
	ref?: (node?: Element | null) => void
}

export const Post = ({ data, ref }: PostProps) => {
	if (data.crosspost_parent_list && data.crosspost_parent_list.length > 0) {
	}

	return (
		<Card className={cn("w-full", "max-w-md", "p-4")} ref={ref}>
			{data.crosspost_parent_list && data.crosspost_parent_list.length > 0 ? (
				<PostContent data={data.crosspost_parent_list[0]} />
			) : (
				<PostContent data={data} />
			)}
		</Card>
	)
}
