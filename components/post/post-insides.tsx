import { PostImage } from "@/components/post/post-image"
import { PostLink } from "@/components/post/post-link"
import { getImageUrlFromPost } from "@/lib/reddit-media"
import type { RedditPostData } from "@/types/reddit"
import Markdown from "react-markdown"

type PostInsidesProps = {
	data: RedditPostData
}

export const PostInsides = ({ data }: PostInsidesProps) => {
	const imageUrl = getImageUrlFromPost(data)

	if (imageUrl) return <PostImage imageUrl={imageUrl} title={data.title} />

	if (data.selftext) return <Markdown>{data.selftext}</Markdown>

	return <PostLink url={data.url} />
}
