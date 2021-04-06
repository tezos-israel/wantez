CREATE TABLE "public"."user"(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "username" text NOT NULL,
  "email" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "last_seen_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id"),
  UNIQUE ("id"),
  UNIQUE ("username"),
  UNIQUE ("email")
);

CREATE TABLE "public"."gig_status_type"(
  "value" text NOT NULL,
  "description" text NOT NULL,
  PRIMARY KEY ("value")
);

INSERT INTO
  "gig_status_type" (value, description)
VALUES
  ('pending', 'A pending gig'),
  ('work', 'A gig in work'),
  ('finished', 'A finished gig'),
  ('canceled', 'A canceled gig'),
  ('pendingPaymnet', 'A gig is awaiting payment');

CREATE TABLE "public"."category"(
  "category" text NOT NULL,
  PRIMARY KEY ("category")
);

INSERT INTO
  "category" (category)
VALUES
  ('frontend'),
  ('backend'),
  ('design'),
  ('docs'),
  ('other');

CREATE TABLE "public"."experience_level"(
  "experience_level" text NOT NULL,
  PRIMARY KEY ("experience_level")
);

INSERT INTO
  "experience_level" ("experience_level")
VALUES
  ('beginner'),
  ('medium'),
  ('pro');

CREATE TABLE "public"."time_commitment_type"("value" text NOT NULL, PRIMARY KEY ("value"));

INSERT INTO
  "time_commitment_type" ("value")
VALUES
  ('hours'),
  ('days'),
  ('weeks'),
  ('months');

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."gig"(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "title" text NOT NULL,
  "status" text NOT NULL DEFAULT 'pending',
  "deadline" timestamptz NOT NULL DEFAULT now(),
  "issue_url" text,
  "fee" numeric NOT NULL,
  "funder_id" uuid NOT NULL,
  "description" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "experience_level" text NOT NULL DEFAULT 'beginner',
  "time_commitment" text NOT NULL DEFAULT 'hours',
  "image_url" text NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("status") REFERENCES "public"."gig_status_type"("value") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("funder_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict,
  UNIQUE ("issue_url"),
  CONSTRAINT "gig_experience_level_fkey" FOREIGN KEY ("experience_level") REFERENCES "public"."experience_level" ("experience_level") ON UPDATE restrict ON DELETE restrict,
  CONSTRAINT "gig_time_commitment_fkey" FOREIGN KEY ("time_commitment") REFERENCES "public"."time_commitment_type" ("value") ON UPDATE restrict ON DELETE restrict
);


CREATE TABLE "public"."gig_category"(
  "gig_id" uuid NOT NULL,
  "category" text NOT NULL,
  PRIMARY KEY ("gig_id", "category"),
  FOREIGN KEY ("gig_id") REFERENCES "public"."gig"("id") ON UPDATE restrict ON DELETE cascade,
  FOREIGN KEY ("category") REFERENCES "public"."category"("category") ON UPDATE restrict ON DELETE restrict
);

CREATE TABLE "public"."application_status_type"(
  "value" text NOT NULL,
  "description" text NOT NULL,
  PRIMARY KEY ("value"),
  UNIQUE ("value")
);

INSERT INTO
  "application_status_type" (value, description)
VALUES
  ('pending', 'A pending application'),
  ('approved', 'An approved application'),
  ('dismissed', 'A dismissed application');

CREATE TABLE "public"."application"(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "applicant_id" uuid NOT NULL,
  "gig_id" uuid NOT NULL,
  "details" text NOT NULL,
  "status" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "payment_address" text NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("applicant_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("gig_id") REFERENCES "public"."gig"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("status") REFERENCES "public"."application_status_type"("value") ON UPDATE restrict ON DELETE restrict,
  UNIQUE ("id"),
  UNIQUE ("gig_id"),
  constraint "application_applicantId_gig_id_key" unique ("applicant_id", "gig_id")
);

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_public_application_updated_at" BEFORE
UPDATE
  ON "public"."application" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();

COMMENT ON TRIGGER "set_public_application_updated_at" ON "public"."application" IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."site"("id" text NOT NULL, PRIMARY KEY ("id"));

INSERT INTO
  "site" (id)
VALUES
  ('gitlab'),
  ('github');

CREATE TABLE "public"."social_account"(
  "site" text NOT NULL,
  "user_id" uuid NOT NULL,
  "handle" text NOT NULL,
  "access_token" text,
  PRIMARY KEY ("site", "user_id"),
  FOREIGN KEY ("site") REFERENCES "public"."site"("id") ON UPDATE restrict ON DELETE restrict
);


CREATE TABLE "public"."tags"("name" text NOT NULL, PRIMARY KEY ("name"));

CREATE TABLE "public"."gig_tags"(
  "gig_id" uuid NOT NULL,
  "tag_id" text NOT NULL,
  PRIMARY KEY ("gig_id", "tag_id"),
  FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("name") ON UPDATE cascade ON DELETE cascade,
  FOREIGN KEY ("gig_id") REFERENCES "public"."gig"("id") ON UPDATE cascade ON DELETE cascade
);