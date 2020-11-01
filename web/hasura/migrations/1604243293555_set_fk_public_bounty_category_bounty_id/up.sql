alter table "public"."bounty_category" drop constraint "bounty_category_bounty_id_fkey",
             add constraint "bounty_category_bounty_id_fkey"
             foreign key ("bounty_id")
             references "public"."bounty"
             ("id") on update restrict on delete cascade;
