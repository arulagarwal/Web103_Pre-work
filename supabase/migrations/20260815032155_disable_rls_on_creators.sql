-- The WEB103 prework spec says to leave Row Level Security off ("Uncheck the
-- option Enable Row Level Security"). Supabase enables RLS by default on new
-- tables in the public schema, and a table with RLS on and zero policies is
-- not an error -- it just returns an empty set to the anon key, silently.
-- Without this, the homepage renders "no creators yet" against six real rows.

alter table public.creators disable row level security;
