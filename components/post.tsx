import { Card } from "@/components/ui/card"
import { getImageUrlFromPost } from "@/lib/reddit-media"
import { cn } from "@/lib/utils"
import type { RedditPostData } from "@/types/reddit"
import { ArrowDownIcon, ArrowUpIcon, MessageCircleIcon } from "lucide-react"
import Image from "next/image"

type PostThumbnailProps = {
	data: RedditPostData
}

export const PostThumbnail = ({ data }: PostThumbnailProps) => {
	const imageUrl = getImageUrlFromPost(data)

	if (!imageUrl) return null

	return (
		<div className={cn("w-full", "relative", "max-h-96", "overflow-hidden", "rounded-lg")}>
			<Image className={cn("w-full", "object-cover")} src={imageUrl} alt={data.title} width={512} height={512} />
		</div>
	)
}

type PostProps = {
	data: RedditPostData
}

export const Post = ({ data }: PostProps) => {
	return (
		<Card className={cn("w-full", "max-w-md", "p-4")}>
			<div className={cn("flex", "flex-col", "justify-center", "items-start", "gap-1")}>
				<div className={cn("w-full", "flex", "flex-col", "items-start", "justify-between", "gap-2")}>
					<h3 className={cn("font-semibold", "text-lg", "leading-5")}>{data.title}</h3>
					<PostThumbnail data={data} />
				</div>
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
