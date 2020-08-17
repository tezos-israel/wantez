alter table "public"."application" add constraint "application_applicantId_bountyId_key" unique ("applicantId", "bountyId");
