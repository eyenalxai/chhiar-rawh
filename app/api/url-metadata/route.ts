import { auth } from "@/lib/auth"
import { db, urlMetadatas } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

type OgsMetadataResult = {
	ogUrl: string
	ogTitle: string
	ogImage?: {
		url: string
	}[]
}

export const GET = async (request: Request) => {
	const session = await auth()

	if (!session) return new NextResponse("Unauthorized", { status: 401 })

	const { searchParams } = new URL(request.url)

	const url = searchParams.get("url")

	if (!url) return new NextResponse("url query param is required", { status: 400 })

	const [urlMetadata] = await db.select().from(urlMetadatas).where(eq(urlMetadatas.url, url))

	if (urlMetadata) return NextResponse.json(urlMetadata)

	const ogs = require("open-graph-scraper")
	try {
		const { error, result }: { result: OgsMetadataResult; error: boolean } = await ogs({ url: url })

		if (error) return NextResponse.json({ error: "Failed to fetch metadata" })

		const [newUrlMetadata] = await db
			.insert(urlMetadatas)
			.values({
				url: url,
				title: result.ogTitle,
				image: result.ogImage?.[0]?.url
			})
			.returning()

		return NextResponse.json(newUrlMetadata)
	} catch (e) {
		return NextResponse.json({ error: "Failed to fetch metadata" })
	}
}
