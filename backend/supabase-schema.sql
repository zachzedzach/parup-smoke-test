-- The Fourth Club: player accounts
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to run again; it won't duplicate anything.
--
-- Each player's setup answers are stored as one JSON object (the app's `state`),
-- so new questions in the app don't need database changes.
-- Privacy: Row Level Security means a player can only read, save, or delete
-- their OWN row. Nobody signed out can read anything.

create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

revoke all on public.profiles from anon;
grant select, insert, update, delete on public.profiles to authenticated;

drop policy if exists "read own profile"   on public.profiles;
drop policy if exists "insert own profile" on public.profiles;
drop policy if exists "update own profile" on public.profiles;
drop policy if exists "delete own profile" on public.profiles;

create policy "read own profile"   on public.profiles for select to authenticated using (id = auth.uid());
create policy "insert own profile" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "update own profile" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "delete own profile" on public.profiles for delete to authenticated using (id = auth.uid());

-- Lets a player delete their own account (and, through the cascade, their profile).
create or replace function public.delete_my_account()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- ---------------------------------------------------------------------------
-- Real connection requests (e.g. players tapping "Connect with Rosanna").
-- Players must be signed in. Their first name and account email are stored so
-- the golfer can reach out. Players can only create and see their OWN requests;
-- the golfer reads them in Supabase: Table Editor -> connection_requests.
-- ---------------------------------------------------------------------------
create table if not exists public.connection_requests (
  id          bigint generated always as identity primary key,
  to_golfer   text not null,
  from_user   uuid not null default auth.uid() references auth.users (id) on delete cascade,
  from_name   text not null default '' check (char_length(from_name) <= 60),
  from_email  text not null,
  created_at  timestamptz not null default now(),
  unique (to_golfer, from_user)
);

alter table public.connection_requests enable row level security;
revoke all on public.connection_requests from anon;
grant select, insert, delete on public.connection_requests to authenticated;

drop policy if exists "send own request"   on public.connection_requests;
drop policy if exists "see own requests"   on public.connection_requests;
drop policy if exists "cancel own request" on public.connection_requests;
create policy "send own request" on public.connection_requests for insert to authenticated
  with check (from_user = auth.uid() and from_email = (auth.jwt() ->> 'email') and to_golfer in ('rosanna'));
create policy "see own requests"   on public.connection_requests for select to authenticated using (from_user = auth.uid());
create policy "cancel own request" on public.connection_requests for delete to authenticated using (from_user = auth.uid());
