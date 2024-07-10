import { PostBody } from "@/components/post/post-body"
import { cn } from "@/lib/utils"
import type { RedditPostData } from "@/types/reddit"
import { ArrowDownIcon, ArrowUpIcon, MessageCircleIcon } from "lucide-react"

type PostContentProps = {
	data: RedditPostData
}

export const PostContent = ({ data }: PostContentProps) => {
	return (
		<div className={cn("flex", "flex-col", "justify-center", "items-start", "gap-1")}>
			<h3>{data.title}</h3>
			<div className={cn("w-full", "my-1")}>
				<PostBody data={data} />
			</div>
			<div className={cn("flex", "flex-row", "gap-1", "items-center")}>
				<span className={cn("text-sm")}>u/{data.author}</span>
				<span className={cn("text-sm")}>at</span>
				<span className={cn("font-semibold", "text-sm")}>r/{data.subreddit}</span>
			</div>
			<div className={cn("flex", "flex-row", "items-center", "gap-2")}>
				<div className={cn("flex", "flex-row", "items-center", "gap-0.5")}>
					<MessageCircleIcon className={cn("size-4")} />
					<span className={cn("text-sm")}>{data.num_comments}</span>
				</div>
				<div className={cn("flex", "flex-row", "items-center", "gap-0.5")}>
					<ArrowUpIcon className={cn("size-4")} />
					<span className={cn("text-sm")}>{data.ups}</span>
				</div>
				<div className={cn("flex", "flex-row", "items-center", "gap-0.5")}>
					<ArrowDownIcon className={cn("size-4")} />
					<span className={cn("text-sm")}>{Math.round(data.ups * (1 - data.upvote_ratio))}</span>
				</div>
			</div>
		</div>
	)
}