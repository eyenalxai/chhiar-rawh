type ImageLoaderProps = {
	src: string
	width: number
}

export default function imgProxyLoader({ src, width }: ImageLoaderProps) {
	return `/api/image-optimization?imageUrl=${encodeURIComponent(src)}&width=${width}` // This URL will be used by next/image to fetch the optimized image
}
