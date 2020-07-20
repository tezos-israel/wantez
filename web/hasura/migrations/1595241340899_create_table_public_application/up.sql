CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."application"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "applicantId" uuid NOT NULL, "bountyId" uuid NOT NULL, "details" text NOT NULL, "status" text NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("applicantId") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("bountyId") REFERENCES "public"."bounty"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("status") REFERENCES "public"."applicationStatusType"("value") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("bountyId"));
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
