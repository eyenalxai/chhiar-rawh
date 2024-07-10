import { env } from "@/lib/env"
import { generateImageUrl } from "@imgproxy/imgproxy-node"

type ImageLoaderProps = {
	src: string
	width: number
	quality?: number
}

export default function imgProxyLoader({ src, width, quality }: ImageLoaderProps): string {
	const url = generateImageUrl({
		endpoint: "http://192.168.1.135:8080",
		url: src,
		options: {
			resizing_type: "fill",
			width: width,
			gravity: {
				type: "ce"
			},
			enlarge: 1,
			format: "webp"
		},
		salt: env.IMGPROXY_SALT,
		key: env.IMGPROXY_KEY
	})

	console.log("width", width)
	console.log("quality", quality)
	console.log("src:", src)
	console.log("signature key:", env.IMGPROXY_KEY)
	console.log("signature salt:", env.IMGPROXY_SALT)
	console.log("imgproxyUrl", url)
	console.log("---")

	return url
}
