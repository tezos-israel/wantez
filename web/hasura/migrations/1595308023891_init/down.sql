
ALTER TABLE ONLY "public"."user" ALTER COLUMN "id" DROP DEFAULT;

ALTER TABLE ONLY "public"."user" ALTER COLUMN "createdAt" DROP DEFAULT;

ALTER TABLE "public"."user" ALTER COLUMN "last_seen_at" TYPE timestamp with time zone;
ALTER TABLE ONLY "public"."user" ALTER COLUMN "last_seen_at" DROP DEFAULT;
alter table "public"."user" rename column "lastSeenAt" to "last_seen_at";

alter table "public"."user" rename column "createdAt" to "created_at";


ALTER TABLE "public"."bounty" DROP COLUMN "description";

ALTER TABLE "public"."bounty" DROP COLUMN "title";


DROP TABLE "public"."socialAccount";

DELETE from "site" WHERE id IN ('gitlab', 'github', 'auth0');
DROP TABLE "public"."site";

DROP TABLE "public"."application";

DELETE FROM "applicationStatusType" WHERE value IN ('pending', 'approved', 'dismissed');
DROP TABLE "public"."applicationStatusType";

alter table "public"."bounty" rename column "updatedAt" to "updated_at";

alter table "public"."bounty" rename column "createdAt" to "created_at";

DROP TABLE "public"."bounty";

DELETE FROM "bountyStatusTypes" WHERE value IN ('pending', 'work', 'finished', 'canceled', 'pendingPaymnet');
DROP TABLE "public"."bountyStatusTypes";

DROP TABLE "public"."user";
