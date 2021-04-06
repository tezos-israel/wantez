DROP TABLE "public"."gig_tags";

DROP TABLE "public"."tags";

DROP TABLE "public"."gig_category";

DROP TABLE "public"."category";

DROP TABLE "public"."socialAccount";

DROP TABLE "public"."site";

DROP TABLE "public"."application";

DELETE FROM
  "applicationStatusType"
WHERE
  value IN ('pending', 'approved', 'dismissed');

DROP TABLE "public"."applicationStatusType";

DROP TABLE "public"."gig";

DROP TABLE "public"."timeCommitmentTypes";

DROP TABLE "public"."experienceLevel";

DROP TABLE "public"."gigStatusType";

DROP TABLE "public"."user";