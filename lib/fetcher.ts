type FetcherProps = {
	type: "client" | "server"
	endpoint: string
	method: "GET" | "POST" | "PATCH"
	accessToken?: string
	body?: Record<string, unknown>
}

export const fetcher = async <T>({ type, endpoint, method, accessToken, body }: FetcherProps) => {
	const url = type === "client" ? endpoint : `https://oauth.reddit.com/${endpoint}`

	return fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
		cache: "no-store"
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText)
			}

			return response.json() as unknown as T
		})
		.catch((error) => {
			throw new Error(error)
		})
}
