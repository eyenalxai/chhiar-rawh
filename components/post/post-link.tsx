"use client"

import type { urlMetadatas } from "@/lib/schema"
import type { UrlMetadataResponse } from "@/types/url-metadata"
import { useQuery } from "@tanstack/react-query"

type PostLinkProps = {
	url: string
}

export const PostLink = ({ url }: PostLinkProps) => {
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

	if (error) return <div>{error.message}</div>

	if (!data) return <div>Loading...</div>

	return (
		<div>
			{data.title} {data.url}
		</div>
	)
}
