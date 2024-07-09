import type { JWT } from "@auth/core/jwt"

export type AuthToken = {
	userId: string
	username: string
	accessToken: string
	accessTokenExpiresAt: number
} & JWT
