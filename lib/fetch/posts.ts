import { fetcher } from "@/lib/fetcher"
import type { RedditListingObj, RedditPostObj } from "@/types/reddit"

type GetHotPostsProps = {
	accessToken: string
}

export const getHotPosts = ({ accessToken }: GetHotPostsProps) => {
	return fetcher<RedditListingObj<RedditPostObj>>({
		endpoint: "hot",
		method: "GET",
		accessToken: accessToken
	})
}
