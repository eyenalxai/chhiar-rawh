import { env } from "@/lib/env"

export const tokenHasExpiredWithEpoch = (expiresInEpoch: number) => {
	return Date.now() > expiresInEpoch * 1000
}

type RedditAccessTokenResponse = {
	access_token: string
	expires_in: number
}

export const refreshAccessToken = async (refreshToken: string) =>
	fetch("https://www.reddit.com/api/v1/access_token", {
		method: "POST",
		headers: new Headers({
			Authorization: `Basic ${btoa(`${env.AUTH_REDDIT_ID}:${env.AUTH_REDDIT_SECRET}`)}`,
			"Content-Type": "application/x-www-form-urlencoded"
		}),
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken
		})
	})
		.then((response) => response.json() as unknown as RedditAccessTokenResponse)
		.catch((error) => {
			throw new Error(error)
		})
