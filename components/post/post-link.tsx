"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { urlMetadatas } from "@/lib/schema"
import { cn } from "@/lib/utils"
import type { UrlMetadataResponse } from "@/types/url-metadata"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

type PostLinkProps = {
	url: string
}

export const PostLink = ({ url }: PostLinkProps) => {
	const domain = new URL(url).hostname

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

	if (error)
		return (
			<a className={cn("w-full", "no-underline")} href={url} target={"_blank"} rel={"noopener noreferrer"}>
				<div
					className={cn(
						"w-full",
						"h-48",
						"rounded-lg",
						["bg-blue-100", "dark:bg-blue-900"],
						"flex",
						"justify-start",
						"items-end",
						"p-2"
					)}
				>
					<div className={cn("rounded-lg", "bg-blue-500", "py-1", "px-3", "text-white", "text-sm")}>{domain}</div>
				</div>
			</a>
		)

	if (!data) return <Skeleton className={cn("w-full", "h-48", "rounded-lg", "animate-pulse")} />

	if (data.image) {
		return (
			<a href={data.url} className={cn("w-full")}>
				<Card className={cn("w-full", "relative", "overflow-hidden", "rounded-lg")}>
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
						{data.title}
					</p>
					<Image className={cn("w-full", "object-cover")} src={data.image} alt={data.title} width={512} height={512} />
					<p className={cn("p-2", "w-full", "bg-primary-foreground", "text-primary", "font-semibold", "text-xs")}>
						{new URL(data.url).hostname}
					</p>
				</Card>
			</a>
		)
	}

	return (
		<a className={cn("w-full", "no-underline")} href={url} target={"_blank"} rel={"noopener noreferrer"}>
			<div
				className={cn(
					"w-full",
					"h-48",
					"rounded-lg",
					["bg-blue-100", "dark:bg-blue-900"],
					"flex",
					"justify-start",
					"items-end",
					"p-2"
				)}
			>
				<div className={cn("rounded-lg", "bg-blue-500", "py-1", "px-3", "text-white", "text-sm")}>{domain}</div>
			</div>
		</a>
	)
}
