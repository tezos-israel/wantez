CREATE TABLE "public"."user"(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "username" text NOT NULL,
  "email" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "lastSeenAt" timestamptz DEFAULT now(),
  PRIMARY KEY ("id"),
  UNIQUE ("id"),
  UNIQUE ("username"),
  UNIQUE ("email")
);

CREATE TABLE "public"."bountyStatusTypes"(
  "value" text NOT NULL,
  "description" text NOT NULL,
  PRIMARY KEY ("value")
);

INSERT INTO
  "bountyStatusTypes" (value, description)
VALUES
  ('pending', 'A pending bounty'),
  ('work', 'A bounty in work'),
  ('finished', 'A finished bounty'),
  ('canceled', 'A canceled bounty'),
  ('pendingPaymnet', 'A bounty is awaiting payment');

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

CREATE TABLE "public"."experienceLevel"(
  "experienceLevel" text NOT NULL,
  PRIMARY KEY ("experienceLevel")
);

INSERT INTO
  "experienceLevel" ("experienceLevel")
VALUES
  ('beginner'),
  ('medium'),
  ('pro');

CREATE TABLE "public"."timeCommitmentTypes"("value" text NOT NULL, PRIMARY KEY ("value"));

INSERT INTO
  "timeCommitmentTypes" ("value")
VALUES
  ('hours'),
  ('days'),
  ('weeks'),
  ('months');

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."bounty"(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "title" text NOT NULL,
  "status" text NOT NULL DEFAULT 'pending',
  "deadline" timestamptz NOT NULL DEFAULT now(),
  "issueUrl" text,
  "fee" numeric NOT NULL,
  "funderId" uuid NOT NULL,
  "description" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "experienceLevel" text NOT NULL DEFAULT 'beginner',
  "timeCommitment" text NOT NULL DEFAULT 'hours',
  "imageUrl" text NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("status") REFERENCES "public"."bountyStatusTypes"("value") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("funderId") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict,
  UNIQUE ("issueUrl"),
  CONSTRAINT "bounty_experienceLevel_fkey" FOREIGN KEY ("experienceLevel") REFERENCES "public"."experienceLevel" ("experienceLevel") ON UPDATE restrict ON DELETE restrict,
  CONSTRAINT "bounty_timeCommitment_fkey" FOREIGN KEY ("timeCommitment") REFERENCES "public"."timeCommitmentTypes" ("value") ON UPDATE restrict ON DELETE restrict
);


CREATE TABLE "public"."bounty_category"(
  "bounty_id" uuid NOT NULL,
  "category" text NOT NULL,
  PRIMARY KEY ("bounty_id", "category"),
  FOREIGN KEY ("bounty_id") REFERENCES "public"."bounty"("id") ON UPDATE restrict ON DELETE cascade,
  FOREIGN KEY ("category") REFERENCES "public"."category"("category") ON UPDATE restrict ON DELETE restrict
);

CREATE TABLE "public"."applicationStatusType"(
  "value" text NOT NULL,
  "description" text NOT NULL,
  PRIMARY KEY ("value"),
  UNIQUE ("value")
);

INSERT INTO
  "applicationStatusType" (value, description)
VALUES
  ('pending', 'A pending application'),
  ('approved', 'An approved application'),
  ('dismissed', 'A dismissed application');

CREATE TABLE "public"."application"(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "applicantId" uuid NOT NULL,
  "bountyId" uuid NOT NULL,
  "details" text NOT NULL,
  "status" text NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "paymentAddress" text NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("applicantId") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("bountyId") REFERENCES "public"."bounty"("id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("status") REFERENCES "public"."applicationStatusType"("value") ON UPDATE restrict ON DELETE restrict,
  UNIQUE ("id"),
  UNIQUE ("bountyId"),
  constraint "application_applicantId_bountyId_key" unique ("applicantId", "bountyId")
);

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updatedAt"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updatedAt" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_public_application_updatedAt" BEFORE
UPDATE
  ON "public"."application" FOR EACH ROW EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();

COMMENT ON TRIGGER "set_public_application_updatedAt" ON "public"."application" IS 'trigger to set value of column "updatedAt" to current timestamp on row update';

CREATE TABLE "public"."site"("id" text NOT NULL, PRIMARY KEY ("id"));

INSERT INTO
  "site" (id)
VALUES
  ('gitlab'),
  ('github');

CREATE TABLE "public"."socialAccount"(
  "site" text NOT NULL,
  "userId" uuid NOT NULL,
  "handle" text NOT NULL,
  "accessToken" text,
  PRIMARY KEY ("site", "userId"),
  FOREIGN KEY ("site") REFERENCES "public"."site"("id") ON UPDATE restrict ON DELETE restrict
);


CREATE TABLE "public"."tags"("name" text NOT NULL, PRIMARY KEY ("name"));

CREATE TABLE "public"."bounty_tags"(
  "bounty_id" uuid NOT NULL,
  "tag_id" text NOT NULL,
  PRIMARY KEY ("bounty_id", "tag_id"),
  FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("name") ON UPDATE cascade ON DELETE cascade,
  FOREIGN KEY ("bounty_id") REFERENCES "public"."bounty"("id") ON UPDATE cascade ON DELETE cascade
);