import { auth } from "@/lib/auth"
import { getNewPostsServer } from "@/lib/fetch/server/posts"
import { NextResponse } from "next/server"

export const GET = async () => {
	const session = await auth()

	if (!session) return new NextResponse("Unauthorized", { status: 401 })

	const newPosts = await getNewPostsServer({ accessToken: session.accessToken })

	return NextResponse.json(newPosts)
}
