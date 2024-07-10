"use client"

import type { UrlMetadataResponse, UrlMetadataResult } from "@/types/url-metadata"
import { useQuery } from "@tanstack/react-query"

type PostLinkProps = {
	url: string
}

export const PostLink = ({ url }: PostLinkProps) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["url-metadata", { url }],
		queryFn: async () =>
			await fetch(`/api/url-metadata?url=${url}`).then(async (res) => {
				const json = (await res.json()) as unknown as UrlMetadataResponse
				if ("error" in json && json.error) throw new Error(json.error)
				return json as UrlMetadataResult
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
