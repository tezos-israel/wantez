alter table "public"."bounty"
           add constraint "bounty_experienceLevel_fkey"
           foreign key ("experienceLevel")
           references "public"."experienceLevel"
           ("experienceLevel") on update restrict on delete restrict;
