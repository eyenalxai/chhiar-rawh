import { fetcher } from "@/lib/fetcher"
import type { PostsType, RedditListingObj, RedditPostObj } from "@/types/reddit"

type GetPostsClientProps = {
	type: PostsType
	after?: string
}

export const getPostsClient = ({ type, after }: GetPostsClientProps) => {
	return fetcher<RedditListingObj<RedditPostObj>>({
		type: "client",
		endpoint: `api/posts/${type}`,
		method: "GET",
		...(after ? { queryParams: { after: after } } : {})
	})
}
