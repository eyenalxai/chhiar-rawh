import { auth } from "@/lib/auth"
import { getPostsServer } from "@/lib/fetch/server/posts"
import { NextResponse } from "next/server"

export const GET = async () => {
	const session = await auth()

	if (!session) return new NextResponse("Unauthorized", { status: 401 })

	const posts = await getPostsServer({ accessToken: session.accessToken, type: "top" })

	return NextResponse.json(posts)
}
