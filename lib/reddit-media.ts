import type { RedditPostData } from "@/types/reddit"

export const getImageUrlFromPost = (post: RedditPostData): string | undefined => {
	if (
		post.post_hint &&
		post.post_hint === "image" &&
		post.url_overridden_by_dest?.match(/\.(jpeg|jpg|gif|png|webp)$/)
	) {
		return post.url_overridden_by_dest
	}

	if (post.media_metadata) {
		const imageMetadata = Object.values(post.media_metadata).find((metadata) => metadata.e === "Image")
		if (imageMetadata?.s) {
			return imageMetadata.s.u?.replace(/amp;/g, "") ?? undefined
		}
	}

	if (post.preview?.images?.length && post.preview?.images?.length > 0) {
		return post.preview.images[0].source.url.replace(/amp;/g, "")
	}

	return undefined
}
