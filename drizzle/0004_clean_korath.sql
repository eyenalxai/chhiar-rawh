CREATE TABLE IF NOT EXISTS "url_metadata" (
	"url" text NOT NULL,
	"title" text NOT NULL,
	"image" text,
	CONSTRAINT "url_metadata_url_unique" UNIQUE("url")
);
