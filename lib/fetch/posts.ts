import { fetcher } from "@/lib/fetcher"
import type { RedditListingObj, RedditPostObj } from "@/types/reddit"

type GetHotPostsProps = {
	accessToken: string
}

export const getNewPosts = ({ accessToken }: GetHotPostsProps) => {
	return fetcher<RedditListingObj<RedditPostObj>>({
		endpoint: "new",
		method: "GET",
		accessToken: accessToken
	})
}
