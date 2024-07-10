import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { RedditPostData } from "@/types/reddit"
import { ArrowDownIcon, ArrowUpIcon, MessageCircleIcon } from "lucide-react"

type PostProps = {
	data: RedditPostData
}

export const Post = ({ data }: PostProps) => {
	return (
		<Card className={cn("w-full", "max-w-md", "p-4")}>
			<div className={cn("flex", "flex-col", "justify-center", "items-start", "gap-1")}>
				<h3 className={cn("font-semibold", "text-lg", "leading-5")}>{data.title}</h3>
				<div className={cn("flex", "flex-row", "gap-1", "items-center")}>
					<span className={cn("font-semibold", "text-sm")}>u/{data.author}</span>
					<span className={cn("text-sm")}>at</span>
					<span className={cn("text-sm")}>r/{data.subreddit}</span>
				</div>
				<div className={cn("flex", "flex-row", "items-center", "gap-2")}>
					<div className={cn("flex", "flex-row", "items-center", "gap-0.5")}>
						<MessageCircleIcon className={cn("size-4")} />
						<span className={cn("text-sm")}>{data.num_comments}</span>
					</div>
					<div className={cn("flex", "flex-row", "items-center", "gap-0.5")}>
						<ArrowUpIcon className={cn("size-4", "text-amber-500")} />
						<span className={cn("text-sm")}>{data.ups}</span>
					</div>
					<div className={cn("flex", "flex-row", "items-center", "gap-0.5")}>
						<ArrowDownIcon className={cn("size-4", "text-blue-500")} />
						<span className={cn("text-sm")}>{Math.round(data.ups * (1 - data.upvote_ratio))}</span>
					</div>
				</div>
			</div>
		</Card>
	)
}
