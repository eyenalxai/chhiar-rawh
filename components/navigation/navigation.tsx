"use client"

import { NavigationButton } from "@/components/navigation/navigation-button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const Navigation = () => {
	const pathname = usePathname()

	return (
		<div className={cn("fixed", "w-full", "flex", "justify-start", "p-2", "backdrop-blur-xl", "z-50", "border-b")}>
			<div className={cn("flex", "flex-row", "gap-2")}>
				<NavigationButton path={"/hot"} text={"Home"} isActive={pathname === "/hot"} />
				<NavigationButton path={"/best"} text={"Popular"} isActive={pathname === "/best"} />
				<NavigationButton path={"/new"} text={"New"} isActive={pathname === "/new"} />
			</div>
		</div>
	)
}
