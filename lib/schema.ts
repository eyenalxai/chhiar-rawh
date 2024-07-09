import { env } from "@/lib/env"
import { integer, pgTable, text } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const connectionString = env.AUTH_DRIZZLE_URL
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	username: text("name").unique().notNull()
})

export const accounts = pgTable("account", {
	userId: text("userId")
		.notNull()
		.unique()
		.references(() => users.id, { onDelete: "cascade" }),
	refresh_token: text("refresh_token").notNull(),
	access_token: text("access_token").notNull(),
	expires_in: integer("expires_in").notNull()
})
