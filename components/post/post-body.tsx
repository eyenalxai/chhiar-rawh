import { ExternalLinkPreview } from "@/components/post/external-link-preview"
import { PostImage } from "@/components/post/post-image"
import { getImageUrlFromPost } from "@/lib/reddit-media"
import { cn } from "@/lib/utils"
import type { RedditPostData } from "@/types/reddit"

type PostBodyProps = {
	data: RedditPostData
}

export const PostBody = ({ data }: PostBodyProps) => {
	if (
		data.url &&
		!data.url.includes("reddit.com") &&
		!data.url.includes("i.redd.it") &&
		!data.url.includes("v.redd.it")
	)
		return <ExternalLinkPreview url={data.url} title={data.title} />

	if (data.url.includes("v.redd.it")) return <div>Videos are not supported yet</div>

	const imageUrl = getImageUrlFromPost(data)

	if (imageUrl) return <PostImage imageUrl={imageUrl} title={data.title} />

	return <p className={cn("text-sm", "line-clamp-3")}>{data.selftext}</p>
}
