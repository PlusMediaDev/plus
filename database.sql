CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR(254) NOT NULL UNIQUE,
	"password" VARCHAR(1000) NOT NULL,
	"tokens" INT NOT NULL DEFAULT 0
		CONSTRAINT "tokens_not_negative" CHECK ("tokens" >= 0),
	"last_uploaded_at" TIMESTAMP
);

CREATE TABLE "uploads_for_rating" (
	"id" SERIAL PRIMARY KEY,
	"content_url" TEXT NOT NULL,
	"s3_key" TEXT,
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
	"tokens" INT NOT NULL DEFAULT 1
		CONSTRAINT "positive_tokens" CHECK ("tokens" >= 0),
	"total_matches" INT NOT NULL DEFAULT 0,
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



--
-- Test data
--

INSERT INTO "uploads_for_rating"
	("content_url", "total_ratings", "user_id")
VALUES
	(
		'https://imgix.ranker.com/user_node_img/50039/1000767277/original/who-s-that-pokemon-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375',
		0,
		1
	),
	(
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnG1Zhruoi_psIM0m1dFdBZkPoBQN-_C3L1Ta1pfrhBbI7WvG6e8EqY74hIdEOrLXRcho&usqp=CAU',
		0,
		1
	),
	(
		'https://i.redd.it/nv8yby9gasm61.jpg',
		0,
		1
	),
	(
		'https://i.redd.it/rgce12mplle51.jpg',
		0,
		1
	),
	(
		'https://i.chzbgr.com/full/9251352832/h7ACA8929/abraham-lincoln-as-an-answer-on-their-calculator-above-a-pic-of-a-little-kid-looking-frustrated',
		0,
		1
	),
	(
		'https://i.redd.it/23hex3cutnr51.jpg',
		0,
		1
	),
	(
		'https://res.cloudinary.com/practicaldev/image/fetch/s--DDDvUQUe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/741b87500f9eip1evmj2.jpg',
		0,
		1
	);
