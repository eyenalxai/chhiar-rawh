import type { AuthToken } from "@/types/token"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
	interface Session extends DefaultSession, AuthToken {}
}
