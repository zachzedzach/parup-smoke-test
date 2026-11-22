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
-- Messages between featured real golfers (e.g. Rosanna) and players.
-- One conversation per (golfer, player). A player can only read and write their
-- own conversation; the golfer's account can read and reply to all of hers.
-- Players' emails are never stored here: only the first name they typed.
-- ---------------------------------------------------------------------------
create table if not exists public.featured_golfers (
  id       text primary key,                 -- e.g. 'rosanna'
  user_id  uuid unique references auth.users (id) on delete set null
);
alter table public.featured_golfers enable row level security;
revoke all on public.featured_golfers from anon;
grant select on public.featured_golfers to authenticated;
drop policy if exists "signed-in players can see featured golfers" on public.featured_golfers;
create policy "signed-in players can see featured golfers" on public.featured_golfers for select to authenticated using (true);
insert into public.featured_golfers (id) values ('rosanna') on conflict (id) do nothing;

create table if not exists public.messages (
  id           bigint generated always as identity primary key,
  golfer       text not null references public.featured_golfers (id) on delete cascade,
  player       uuid not null references auth.users (id) on delete cascade,
  player_name  text not null default '' check (char_length(player_name) <= 60),
  sender       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  body         text not null check (char_length(btrim(body)) between 1 and 1000),
  created_at   timestamptz not null default now()
);
create index if not exists messages_thread on public.messages (golfer, player, created_at);

alter table public.messages enable row level security;
revoke all on public.messages from anon;
grant select, insert on public.messages to authenticated;

create or replace function public.owns_golfer(g text)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.featured_golfers f where f.id = g and f.user_id = auth.uid());
$$;
revoke all on function public.owns_golfer(text) from public, anon;
grant execute on function public.owns_golfer(text) to authenticated;

drop policy if exists "read own conversation" on public.messages;
drop policy if exists "write own conversation" on public.messages;
create policy "read own conversation" on public.messages for select to authenticated
  using (player = auth.uid() or public.owns_golfer(golfer));
create policy "write own conversation" on public.messages for insert to authenticated
  with check (sender = auth.uid() and (player = auth.uid() or public.owns_golfer(golfer)));
