"use client"

import { LinkPreviewCard } from "@/components/post/link-preview-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { urlMetadatas } from "@/lib/schema"
import { cn } from "@/lib/utils"
import type { UrlMetadataResponse } from "@/types/url-metadata"
import { useQuery } from "@tanstack/react-query"

type ExternalLinkPreviewProps = {
	url: string
	title: string
}

export const ExternalLinkPreview = ({ url, title }: ExternalLinkPreviewProps) => {
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

	if (error) return <LinkPreviewCard url={url} title={title} />

	return <LinkPreviewCard url={data.url} title={data.title} image={data.image} />
}
