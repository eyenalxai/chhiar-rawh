export type Post = {
	kind: "Listing"
	id: string
	title: string
	data: {
		children: {
			id: string
			title: string
		}[]
	}
}
