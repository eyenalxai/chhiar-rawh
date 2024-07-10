/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: "custom",
		loaderFile: "./lib/image-loader.ts",
		domains: ["192.168.1.135:8080"]
	}
}

module.exports = nextConfig
