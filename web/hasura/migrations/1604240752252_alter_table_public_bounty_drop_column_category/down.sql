ALTER TABLE "public"."bounty" ADD COLUMN "category" text;
ALTER TABLE "public"."bounty" ALTER COLUMN "category" DROP NOT NULL;
ALTER TABLE "public"."bounty" ADD CONSTRAINT bounty_category_fkey FOREIGN KEY (category) REFERENCES "public"."category" (category) ON DELETE restrict ON UPDATE restrict;
ALTER TABLE "public"."bounty" ALTER COLUMN "category" SET DEFAULT 'other'::text;
