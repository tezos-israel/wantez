
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
