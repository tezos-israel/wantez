



CREATE TABLE "public"."user"("id" uuid NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "created_at" timestamptz NOT NULL, "last_seen_at" timestamptz NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("username"), UNIQUE ("email"));

CREATE TABLE "public"."bountyStatusTypes"("value" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO "bountyStatusTypes" (value, description) VALUES ('pending', 'A pending bounty'), ('work', 'A bounty in work'), ('finished', 'A finished bounty'), ('canceled', 'A canceled bounty'), ('pendingPaymnet', 'A bounty is awaiting payment');

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."bounty"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "contractAddress" text, "status" text NOT NULL, "issueUrl" text, "fee" numeric NOT NULL, "funderId" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("status") REFERENCES "public"."bountyStatusTypes"("value") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("funderId") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("issueUrl"));

alter table "public"."bounty" rename column "created_at" to "createdAt";

alter table "public"."bounty" rename column "updated_at" to "updatedAt";

CREATE TABLE "public"."applicationStatusType"("value" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO "applicationStatusType" (value, description) VALUES ('pending', 'A pending application'), ('approved', 'An approved application'), ('dismissed', 'A dismissed application');

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."application"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "applicantId" uuid NOT NULL, "bountyId" uuid NOT NULL, "details" text NOT NULL, "status" text NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("applicantId") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("bountyId") REFERENCES "public"."bounty"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("status") REFERENCES "public"."applicationStatusType"("value") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("bountyId"));
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
CREATE TRIGGER "set_public_application_updatedAt"
BEFORE UPDATE ON "public"."application"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_application_updatedAt" ON "public"."application" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';

CREATE TABLE "public"."site"("id" text NOT NULL, PRIMARY KEY ("id") );

INSERT INTO "site" (id) VALUES ('gitlab'), ('github'), ('auth0');

CREATE TABLE "public"."socialAccount"("site" text NOT NULL, "userId" uuid NOT NULL, "handle" text NOT NULL, PRIMARY KEY ("site","userId") , FOREIGN KEY ("site") REFERENCES "public"."site"("id") ON UPDATE restrict ON DELETE restrict);

ALTER TABLE "public"."bounty" ADD COLUMN "title" text NOT NULL;

ALTER TABLE "public"."bounty" ADD COLUMN "description" text NOT NULL;

alter table "public"."user" rename column "created_at" to "createdAt";

ALTER TABLE "public"."user" ALTER COLUMN "last_seen_at" TYPE timestamp with time zone;
ALTER TABLE ONLY "public"."user" ALTER COLUMN "last_seen_at" SET DEFAULT now();
alter table "public"."user" rename column "last_seen_at" to "lastSeenAt";

ALTER TABLE ONLY "public"."user" ALTER COLUMN "createdAt" SET DEFAULT now();

ALTER TABLE ONLY "public"."user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

ALTER TABLE ONLY "public"."bounty" ALTER COLUMN "status" SET DEFAULT 'pending';
