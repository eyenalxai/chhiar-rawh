import { auth } from "@/lib/auth"
import { env } from "@/lib/env"
import { generateImageUrl } from "@imgproxy/imgproxy-node"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
	const session = await auth()

	if (!session) return new NextResponse("Unauthorized", { status: 401 })

	const { searchParams } = new URL(request.url)

	const imageUrl = searchParams.get("imageUrl")
	if (!imageUrl) return new NextResponse("imageUrl query param is required", { status: 400 })

	const widthString = searchParams.get("width")
	if (!widthString) return new NextResponse("width query param is required", { status: 400 })

	const width = Number.parseInt(widthString)

	if (Number.isNaN(width)) return new NextResponse("width query param must be a number", { status: 400 })

	const optimizedImageUrl = generateImageUrl({
		endpoint: "http://192.168.1.135:8080",
		url: imageUrl,
		options: {
			resizing_type: "fill",
			width: width,
			gravity: {
				type: "ce"
			},
			enlarge: 1,
			format: "webp",
			quality: 80
		},
		salt: env.IMGPROXY_SALT,
		key: env.IMGPROXY_KEY
	})

	return NextResponse.redirect(optimizedImageUrl)
}
