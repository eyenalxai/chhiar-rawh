type FetcherProps = {
	endpoint: string
	method: "GET" | "POST" | "PATCH"
	accessToken: string
	body?: Record<string, unknown>
}

export const fetcher = async <T>({ endpoint, method, accessToken, body }: FetcherProps) => {
	const baseUrl = "https://oauth.reddit.com"

	return fetch(`${baseUrl}/${endpoint}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
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
