import { fetcher } from "@/lib/fetcher"
import type { RedditListingObj, RedditPostObj } from "@/types/reddit"

export const getNewPostsClient = () => {
	return fetcher<RedditListingObj<RedditPostObj>>({
		type: "client",
		endpoint: "api/posts/new",
		method: "GET"
	})
}
