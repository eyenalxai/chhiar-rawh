import { PostImage } from "@/components/post/post-image"
import { PostLink } from "@/components/post/post-link"
import { getImageUrlFromPost } from "@/lib/reddit-media"
import type { RedditPostData } from "@/types/reddit"
import Markdown from "react-markdown"

type PostInsidesProps = {
	data: RedditPostData
}

export const PostInsides = ({ data }: PostInsidesProps) => {
	if (
		data.url &&
		!data.url.includes("reddit.com") &&
		!data.url.includes("i.redd.it") &&
		!data.url.includes("v.redd.it")
	)
		return <PostLink url={data.url} title={data.title} />

	if (data.url.includes("v.redd.it")) return <div>Videos are not supported yet</div>

	const imageUrl = getImageUrlFromPost(data)

	if (imageUrl) return <PostImage imageUrl={imageUrl} title={data.title} />

	if (data.selftext) return <Markdown>{data.selftext}</Markdown>

	return <Markdown>{data.selftext}</Markdown>
}
