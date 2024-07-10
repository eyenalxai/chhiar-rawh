export type UrlMetadataResponse = UrlMetadataResult | UrlMetadataError

export type UrlMetadataResult = {
	title: string
	url: string
	image: string | null | undefined
}

export type UrlMetadataError = {
	error: string
}
