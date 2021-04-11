DROP TABLE "public"."gig_tags";

DROP TABLE "public"."tags";

DROP TABLE "public"."gig_category";

DROP TABLE "public"."category";

DROP TABLE "public"."social_account";

DROP TABLE "public"."site";

DROP TABLE "public"."application";

DELETE FROM
  "application_status_type"
WHERE
  value IN ('pending', 'approved', 'dismissed');

DROP TABLE "public"."application_status_type";

DROP TABLE "public"."gig";

DROP TABLE "public"."time_commitment_type";

DROP TABLE "public"."experience_level";

DROP TABLE "public"."gig_status_type";

DROP TABLE "public"."user";