CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(254) NOT NULL UNIQUE,
	"password" VARCHAR(1000) NOT NULL,
	"tokens" INT NOT NULL DEFAULT 0
		CONSTRAINT "tokens_not_negative" CHECK ("tokens" >= 0)
);

CREATE TABLE "uploads_for_rating" (
	"id" SERIAL PRIMARY KEY,
	"content_url" TEXT NOT NULL,
	"total_ratings" INT NOT NULL DEFAULT 0,
	"uploaded_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"user_id" INT NOT NULL REFERENCES "users" ON DELETE CASCADE
);

CREATE TABLE "ratings" (
	"id" SERIAL PRIMARY KEY,
	"rating" INT NOT NULL,
	"upload_id" INT NOT NULL REFERENCES "uploads_for_rating" ON DELETE CASCADE,
	"user_id" INT NOT NULL REFERENCES "users" ON DELETE CASCADE,
	UNIQUE ("upload_id", "user_id")
);

CREATE TABLE "uploads_for_matching" (
	"id" SERIAL PRIMARY KEY,
	"average_rating" DOUBLE PRECISION NOT NULL,
	"total_matchings" INT NOT NULL DEFAULT 0,
	"last_matched_at" TIMESTAMP,
	"uploaded_at" TIMESTAMP NOT NULL,
	"user_id" INT NOT NULL REFERENCES "users" ON DELETE CASCADE
);

CREATE TABLE "matches" (
	"id" SERIAL PRIMARY KEY,
	"upload_1_id" INT NOT NULL REFERENCES "uploads_for_matching" ON DELETE CASCADE,
	"upload_2_id" INT NOT NULL REFERENCES "uploads_for_matching" ON DELETE CASCADE,
	UNIQUE ("upload_1_id", "upload_2_id"),
	CHECK ("upload_1_id" != "upload_2_id")
);
