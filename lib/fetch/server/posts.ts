import { fetcher } from "@/lib/fetcher"
import type { RedditListingObj, RedditPostObj } from "@/types/reddit"

type GetHotPostsProps = {
	accessToken: string
}

export const getNewPostsServer = ({ accessToken }: GetHotPostsProps) => {
	return fetcher<RedditListingObj<RedditPostObj>>({
		type: "server",
		endpoint: "new",
		method: "GET",
		accessToken: accessToken
	})
}
