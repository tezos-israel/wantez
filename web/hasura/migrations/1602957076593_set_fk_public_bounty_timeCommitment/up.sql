alter table "public"."bounty"
           add constraint "bounty_timeCommitment_fkey"
           foreign key ("timeCommitment")
           references "public"."timeCommitmentTypes"
           ("value") on update restrict on delete restrict;
