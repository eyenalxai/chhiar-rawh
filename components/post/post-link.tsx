"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { urlMetadatas } from "@/lib/schema"
import { cn } from "@/lib/utils"
import type { UrlMetadataResponse } from "@/types/url-metadata"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

type YikesProps = {
	url: string
	title: string
	image?: string | null
}

export const Yikes = ({ url, title, image }: YikesProps) => {
	return (
		<a href={url} rel={"noopener noreferrer"} target="_blank" className={cn("w-full", "no-underline")}>
			<Card className={cn("w-full", "overflow-hidden", "rounded-lg", "h-72")}>
				<p
					className={cn(
						"bg-primary",
						"p-2",
						"w-full",
						"text-center",
						"text-primary-foreground",
						"text-ellipsis",
						"overflow-hidden",
						"text-nowrap",
						"font-semibold"
					)}
				>
					{title}
				</p>
				{image ? (
					<div className={cn("w-full", "relative", "h-52", "overflow-hidden")}>
						<Image className={cn("w-full", "object-cover")} src={image} alt={title} width={512} height={512} />
					</div>
				) : (
					<div className={cn("bg-primary-foreground", "h-52")} />
				)}
				<p
					className={cn(
						"p-3",
						"w-full",
						"h-full",
						"bg-primary-foreground",
						"text-primary",
						"font-semibold",
						"text-xs",
						"text-left"
					)}
				>
					{new URL(url).hostname}
				</p>
			</Card>
		</a>
	)
}

type PostLinkProps = {
	url: string
	title: string
}

export const PostLink = ({ url, title }: PostLinkProps) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["url-metadata", { url }],
		queryFn: async () =>
			await fetch(`/api/url-metadata?url=${url}`).then(async (res) => {
				if (!res.ok) throw new Error(`Failed to fetch metadata. Status: ${res.status}`)
				const json = (await res.json()) as unknown as UrlMetadataResponse
				if ("error" in json && json.error) throw new Error(json.error)
				return json as unknown as typeof urlMetadatas.$inferSelect
			})
	})

	if (!data) return <Skeleton className={cn("w-full", "h-72", "rounded-lg", "animate-pulse")} />

	if (error) return <Yikes url={url} title={title} />

	return <Yikes url={data.url} title={data.title} image={data.image} />
}
