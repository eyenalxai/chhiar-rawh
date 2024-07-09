import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	server: {
		NEXTAUTH_URL: z.string().url(),
		REDDIT_CLIENT_ID: z.string().min(5),
		REDDIT_CLIENT_SECRET: z.string().min(5)
	},
	runtimeEnv: {
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID,
		REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET
	}
})
