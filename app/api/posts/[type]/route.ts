import { auth } from "@/lib/auth"
import { getPostsServer } from "@/lib/fetch/server/posts"
import type { PostsType } from "@/types/reddit"
import { NextResponse } from "next/server"

export const GET = async ({ params }: { params: { type: string } }) => {
	const session = await auth()

	if (!session) return new NextResponse("Unauthorized", { status: 401 })

	const type = params.type as PostsType

	if (type !== "hot" && type !== "new" && type !== "top" && type !== "rising")
		return new NextResponse("Not Found", { status: 404 })

	const posts = await getPostsServer({ accessToken: session.accessToken, type: type })

	return NextResponse.json(posts)
}
