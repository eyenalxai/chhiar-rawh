import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

type NavigationButtonProps = {
	path: string
	text: string
	isActive: boolean
}

export const NavigationButton = ({ path, text, isActive }: NavigationButtonProps) => {
	return (
		<Link href={path} prefetch>
			<Button className={cn("w-24")} variant={isActive ? "default" : "outline"} type={"button"}>
				{text}
			</Button>
		</Link>
	)
}
