"use client"

import { getImageUrlFromPost } from "@/lib/reddit-media"
import { cn } from "@/lib/utils"
import type { RedditPostData } from "@/types/reddit"
import Image from "next/image"
import { useState } from "react"

type PostImageProps = {
	data: RedditPostData
}

export const PostImage = ({ data }: PostImageProps) => {
	const [failed, setFailed] = useState(false)
	const imageUrl = getImageUrlFromPost(data)

	if (!imageUrl) return null

	if (failed) return <span className={cn("text-muted-foreground")}>Failed to load the image :(</span>

	return (
		<div className={cn("w-full", "relative", "max-h-96", "overflow-hidden", "rounded-lg")}>
			<Image
				onError={() => {
					console.error("Image failed to load", imageUrl)
					setFailed(true)
				}}
				className={cn("w-full", "object-cover")}
				src={imageUrl}
				alt={data.title}
				width={512}
				height={512}
			/>
		</div>
	)
}
