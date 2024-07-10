import { fetcher } from "@/lib/fetcher"
import type { RedditListingObj, RedditPostObj } from "@/types/reddit"

type GetHotPostsProps = {
	accessToken: string
}

export const getNewPostsClient = ({ accessToken }: GetHotPostsProps) => {
	return fetcher<RedditListingObj<RedditPostObj>>({
		endpoint: "/api/posts/new",
		method: "GET",
		accessToken: accessToken
	})
}
