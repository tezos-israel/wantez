ALTER TABLE "public"."user_details" ADD COLUMN "id" uuid;
ALTER TABLE "public"."user_details" ALTER COLUMN "id" DROP NOT NULL;
