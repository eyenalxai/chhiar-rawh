"use client"

import { NavigationButton } from "@/components/navigation/navigation-button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const Navigation = () => {
	const pathname = usePathname()

	return (
		<div className={cn("fixed", "w-full", "flex", "justify-start", "p-2", "border", "backdrop-blur-xl", "z-50")}>
			<div className={cn("flex", "flex-row", "gap-2")}>
				<NavigationButton path={"/hot"} text={"Hot"} isActive={pathname === "/hot"} />
				<NavigationButton path={"/new"} text={"New"} isActive={pathname === "/new"} />
				<NavigationButton path={"/top"} text={"Top"} isActive={pathname === "/top"} />
				<NavigationButton path={"/rising"} text={"Rising"} isActive={pathname === "/rising"} />
			</div>
		</div>
	)
}
