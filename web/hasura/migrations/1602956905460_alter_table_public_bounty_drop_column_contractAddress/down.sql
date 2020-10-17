ALTER TABLE "public"."bounty" ADD COLUMN "contractAddress" text;
ALTER TABLE "public"."bounty" ALTER COLUMN "contractAddress" DROP NOT NULL;
