import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	server: {
		AUTH_SECRET: z.string().min(16),
		AUTH_REDDIT_ID: z.string().min(5),
		AUTH_REDDIT_SECRET: z.string().min(5),
		AUTH_DRIZZLE_URL: z.string().min(5)
	},
	runtimeEnv: {
		AUTH_SECRET: process.env.AUTH_SECRET,
		AUTH_REDDIT_ID: process.env.AUTH_REDDIT_ID,
		AUTH_REDDIT_SECRET: process.env.AUTH_REDDIT_SECRET,
		AUTH_DRIZZLE_URL: process.env.AUTH_DRIZZLE_URL
	}
})
