alter table "public"."bounty"
           add constraint "bounty_category_fkey"
           foreign key ("category")
           references "public"."category"
           ("category") on update restrict on delete restrict;
