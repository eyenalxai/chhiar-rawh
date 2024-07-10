import { fetcher } from "@/lib/fetcher"
import type { PostsType, RedditListingObj, RedditPostObj } from "@/types/reddit"

type GetPostsProps = {
	accessToken: string
	type: PostsType
}

export const getPostsServer = ({ accessToken, type }: GetPostsProps) => {
	return fetcher<RedditListingObj<RedditPostObj>>({
		type: "server",
		endpoint: type,
		method: "GET",
		accessToken: accessToken
	})
}
