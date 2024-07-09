ALTER TABLE "account" ALTER COLUMN "refresh_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "access_token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "expires_at" SET NOT NULL;