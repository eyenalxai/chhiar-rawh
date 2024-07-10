import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { RedditPostData } from "@/types/reddit"
import { ArrowDownIcon, ArrowUpIcon, MessageCircleIcon } from "lucide-react"

type PostProps = {
	data: RedditPostData
}

export const Post = ({ data }: PostProps) => {
	return (
		<Card className={cn("w-full", "max-w-md", "p-2")}>
			<div className={cn("flex", "flex-row", "gap-1")}>
				<span className={cn("font-semibold")}>u/{data.author}</span>
				<span>at</span>
				<span>r/{data.subreddit}</span>
			</div>
			<div className={cn("flex", "flex-row", "items-center", "gap-2")}>
				<div className={cn("flex", "flex-row", "items-center", "gap-0.5")}>
					<MessageCircleIcon className={cn("size-4")} />
					<span>{data.num_comments}</span>
				</div>
				<div className={cn("flex", "flex-row", "items-center", "gap-0.5")}>
					<ArrowUpIcon className={cn("size-4", "text-amber-500")} />
					<span>{data.ups}</span>
				</div>
				<div className={cn("flex", "flex-row", "items-center", "gap-0.5")}>
					<ArrowDownIcon className={cn("size-4", "text-blue-500")} />
					<span>{data.downs}</span>
				</div>
			</div>
		</Card>
	)
}
