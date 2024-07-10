import { env } from "@/lib/env"
import pb, { GravityType, ResizeType } from "@bitpatty/imgproxy-url-builder"

type ImageLoaderProps = {
	src: string
	width: number
	quality?: number
}

export default function imgProxyLoader({ src, width, quality }: ImageLoaderProps): string {
	const imageProxyBaseUrl = "http://192.168.1.135:8080"
	console.log("src", src)
	console.log("width", width)
	console.log("quality", quality)
	console.log("---")

	console.log("Debug before .build call:")
	console.log("src:", src)
	console.log("imageProxyBaseUrl:", imageProxyBaseUrl)
	console.log("signature key:", env.IMGPROXY_KEY)
	console.log("signature salt:", env.IMGPROXY_SALT)
	return pb()
		.gravity({
			type: GravityType.CENTER
		})
		.quality(quality || 80)
		.resize({
			type: ResizeType.FILL,
			width: width
		})
		.format("webp")
		.build({
			path: src,
			baseUrl: imageProxyBaseUrl,
			signature: {
				key: env.IMGPROXY_KEY,
				salt: env.IMGPROXY_SALT
			}
		})
}
