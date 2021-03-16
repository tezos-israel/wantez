DROP TABLE "public"."bounty_tags";

DROP TABLE "public"."tags";

DROP TABLE "public"."bounty_category";

DROP TABLE "public"."timeCommitmentTypes";

DROP TABLE "public"."experienceLevel";

DROP TABLE "public"."category";

DROP TABLE "public"."socialAccount";

DROP TABLE "public"."site";

DROP TABLE "public"."application";

DELETE FROM
  "applicationStatusType"
WHERE
  value IN ('pending', 'approved', 'dismissed');

DROP TABLE "public"."applicationStatusType";

DROP TABLE "public"."bounty";

DROP TABLE "public"."bountyStatusTypes";

DROP TABLE "public"."user";