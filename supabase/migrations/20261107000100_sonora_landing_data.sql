create table if not exists public.soundscapes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  country text not null,
  country_code text,
  region text,
  description text not null,
  duration_seconds integer not null check (duration_seconds >= 0),
  artwork_url text,
  audio_url text not null,
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists soundscapes_published_idx
  on public.soundscapes (created_at desc)
  where status = 'published';

create table if not exists public.contributors (
  id uuid primary key references auth.users (id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

create table if not exists public.listening_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  soundscape_id uuid not null references public.soundscapes (id) on delete cascade,
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  started_at timestamptz not null default now()
);

create index if not exists listening_sessions_started_at_idx
  on public.listening_sessions (started_at desc);

alter table public.soundscapes enable row level security;
alter table public.contributors enable row level security;
alter table public.listening_sessions enable row level security;

revoke all on public.soundscapes from anon, authenticated;
grant select on public.soundscapes to anon, authenticated;
revoke all on public.contributors, public.listening_sessions from anon, authenticated;

drop policy if exists "Anyone can read published soundscapes" on public.soundscapes;
create policy "Anyone can read published soundscapes"
  on public.soundscapes for select to anon, authenticated
  using (status = 'published');

create or replace function public.sonora_landing_stats()
returns table (
  total_recordings bigint,
  countries_represented bigint,
  active_contributors bigint,
  listening_hours numeric
)
language sql
stable
security definer
set search_path = public
as $$
  select
    (select count(*) from public.soundscapes where status = 'published'),
    (select count(distinct coalesce(country_code, country)) from public.soundscapes where status = 'published'),
    (select count(*) from public.contributors where status = 'active'),
    coalesce((select sum(duration_seconds)::numeric / 3600 from public.listening_sessions), 0);
$$;

revoke all on function public.sonora_landing_stats() from public;
grant execute on function public.sonora_landing_stats() to anon, authenticated;
