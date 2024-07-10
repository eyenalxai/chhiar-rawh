import { fetcher } from "@/lib/fetcher"
import type { PostsType, RedditListingObj, RedditPostObj } from "@/types/reddit"

type GetHotPostsProps = {
	accessToken: string
	type: PostsType
}

export const getPostsServer = ({ accessToken, type }: GetHotPostsProps) => {
	return fetcher<RedditListingObj<RedditPostObj>>({
		type: "server",
		endpoint: type,
		method: "GET",
		accessToken: accessToken
	})
}
