import type { UrlMetadataResult } from "@/types/url-metadata"
import { NextResponse } from "next/server"

type OgsMetadataResult = {
	ogUrl: string
	ogTitle: string
	ogImage?: {
		url: string
	}[]
}

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url)

	const url = searchParams.get("url")

	if (!url) return new NextResponse("url query param is required", { status: 400 })

	const ogs = require("open-graph-scraper")
	const options = { url: url }

	const { error, result }: { result: OgsMetadataResult; error: boolean } = await ogs(options)

	if (error) return NextResponse.json({ error: "Failed to fetch metadata" })

	return NextResponse.json({
		title: result.ogTitle,
		url: result.ogUrl,
		image: result.ogImage?.[0]?.url
	} satisfies UrlMetadataResult)
}
