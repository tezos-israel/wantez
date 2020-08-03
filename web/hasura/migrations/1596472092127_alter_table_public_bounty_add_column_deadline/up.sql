ALTER TABLE "public"."bounty" ADD COLUMN "deadline" timestamptz NOT NULL DEFAULT now();
