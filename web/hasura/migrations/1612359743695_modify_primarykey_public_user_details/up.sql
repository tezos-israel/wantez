alter table "public"."user_details" drop constraint "user_details_pkey";
alter table "public"."user_details"
    add constraint "user_details_pkey" 
    primary key ( "user_id" );
