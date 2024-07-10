"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

type PostImageProps = {
	imageUrl: string
	title: string
}

export const PostImage = ({ imageUrl, title }: PostImageProps) => {
	const [failed, setFailed] = useState(false)

	if (!imageUrl) return null

	if (failed)
		return (
			<span className={cn("text-muted-foreground")}>
				Failed to load the <a href={imageUrl}>image</a> :(
			</span>
		)

	return (
		<div className={cn("w-full", "relative", "max-h-96", "overflow-hidden", "rounded-lg")}>
			<Image
				onError={() => {
					console.error("Image failed to load", imageUrl)
					setFailed(true)
				}}
				className={cn("w-full", "object-cover")}
				src={imageUrl}
				alt={title}
				width={512}
				height={512}
			/>
		</div>
	)
}
