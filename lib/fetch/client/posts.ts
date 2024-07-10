import { fetcher } from "@/lib/fetcher"
import type { PostsType, RedditListingObj, RedditPostObj } from "@/types/reddit"

type GetPostsClientProps = {
	type: PostsType
}

export const getPostsClient = ({ type }: GetPostsClientProps) => {
	return fetcher<RedditListingObj<RedditPostObj>>({
		type: "client",
		endpoint: `api/posts/${type}`,
		method: "GET"
	})
}
