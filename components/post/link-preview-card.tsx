import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"

type LinkPreviewCardProps = {
	url: string
	title: string
	image?: string | null
}

export const LinkPreviewCard = ({ url, title, image }: LinkPreviewCardProps) => {
	return (
		<a href={url} rel={"noopener noreferrer"} target="_blank" className={cn("w-full", "no-underline")}>
			<Card className={cn("w-full", "overflow-hidden", "rounded-lg", "h-72")}>
				<p
					className={cn(
						"bg-primary",
						"p-2",
						"w-full",
						"text-center",
						"text-primary-foreground",
						"text-ellipsis",
						"overflow-hidden",
						"text-nowrap",
						"font-semibold"
					)}
				>
					{title}
				</p>
				{image ? (
					<div className={cn("w-full", "relative", "h-52", "overflow-hidden")}>
						<Image priority className={cn("w-full", "object-cover")} src={image} alt={title} width={512} height={512} />
					</div>
				) : (
					<div className={cn("bg-primary-foreground", "h-52")} />
				)}
				<p
					className={cn(
						"p-3",
						"w-full",
						"h-full",
						"bg-primary-foreground",
						"text-primary",
						"font-semibold",
						"text-xs",
						"text-left"
					)}
				>
					{new URL(url).hostname}
				</p>
			</Card>
		</a>
	)
}
