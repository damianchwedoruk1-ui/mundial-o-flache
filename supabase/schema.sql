-- Liga Mundialowa — baza danych V1
-- Uruchom w Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'player' check (role in ('player', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists match_days (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references tournaments(id) on delete cascade,
  match_date date not null,
  prediction_open_at timestamptz not null,
  prediction_close_at timestamptz not null,
  evening_power_close_at timestamptz,
  status text not null default 'upcoming' check (status in ('upcoming','open','locked','live','evening_powers','completed')),
  created_at timestamptz not null default now(),
  unique(tournament_id, match_date)
);

create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references tournaments(id) on delete cascade,
  match_day_id uuid not null references match_days(id) on delete cascade,
  team_a text not null,
  team_b text not null,
  kickoff_at timestamptz not null,
  score_a integer,
  score_b integer,
  status text not null default 'scheduled' check (status in ('scheduled','live','finished','scored')),
  created_at timestamptz not null default now()
);

create table if not exists predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  match_id uuid not null references matches(id) on delete cascade,
  predicted_a integer not null check (predicted_a >= 0),
  predicted_b integer not null check (predicted_b >= 0),
  second_predicted_a integer check (second_predicted_a >= 0),
  second_predicted_b integer check (second_predicted_b >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, match_id)
);

create table if not exists powers (
  id text primary key,
  name text not null,
  type text not null check (type in ('morning','evening')),
  icon text not null,
  rarity text not null
);

insert into powers (id, name, type, icon, rarity) values
('vabank','Vabank','morning','🎲','legendary'),
('goleador','Goleador','morning','⚽','rare'),
('split','Rozdwojenie Jaźni','morning','🪞','epic'),
('slabiak','Słabiak','evening','🔄','epic'),
('swap','Zamianka','evening','🔁','rare'),
('block','Blokada','evening','🛡️','rare'),
('thief','Złodziej','evening','🥷','legendary')
on conflict (id) do nothing;

create table if not exists power_uses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  power_id text not null references powers(id),
  match_day_id uuid not null references match_days(id) on delete cascade,
  target_user_id uuid references profiles(id),
  target_match_id uuid references matches(id),
  selected_team text,
  used_at timestamptz not null default now(),
  resolved_at timestamptz,
  status text not null default 'active' check (status in ('active','resolved','blocked','failed','expired'))
);

create table if not exists used_powers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  power_id text not null references powers(id),
  tournament_id uuid not null references tournaments(id) on delete cascade,
  used_at timestamptz not null default now(),
  unique(user_id, power_id, tournament_id)
);

create table if not exists daily_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  match_day_id uuid not null references match_days(id) on delete cascade,
  base_points integer not null default 0,
  power_modified_points integer not null default 0,
  final_points integer not null default 0,
  exact_hits integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, match_day_id)
);

create table if not exists standings (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references tournaments(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  total_points integer not null default 0,
  exact_hits integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(tournament_id, user_id)
);

create table if not exists event_logs (
  id uuid primary key default gen_random_uuid(),
  match_day_id uuid references match_days(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Minimalne RLS. Do dopracowania przy pełnym wdrożeniu.
alter table profiles enable row level security;
alter table tournaments enable row level security;
alter table match_days enable row level security;
alter table matches enable row level security;
alter table predictions enable row level security;
alter table powers enable row level security;
alter table power_uses enable row level security;
alter table used_powers enable row level security;
alter table daily_scores enable row level security;
alter table standings enable row level security;
alter table event_logs enable row level security;

create policy "profiles_select" on profiles for select using (auth.uid() is not null);
create policy "profiles_insert_self" on profiles for insert with check (auth.uid() = id);
create policy "read_all_tournaments" on tournaments for select using (auth.uid() is not null);
create policy "read_all_match_days" on match_days for select using (auth.uid() is not null);
create policy "read_all_matches" on matches for select using (auth.uid() is not null);
create policy "read_all_powers" on powers for select using (auth.uid() is not null);
create policy "read_all_scores" on daily_scores for select using (auth.uid() is not null);
create policy "read_all_standings" on standings for select using (auth.uid() is not null);
create policy "read_all_logs" on event_logs for select using (auth.uid() is not null);

create policy "predictions_self_select" on predictions for select using (auth.uid() = user_id);
create policy "predictions_self_insert" on predictions for insert with check (auth.uid() = user_id);
create policy "predictions_self_update" on predictions for update using (auth.uid() = user_id);

create policy "power_uses_self_select" on power_uses for select using (auth.uid() = user_id);
create policy "power_uses_self_insert" on power_uses for insert with check (auth.uid() = user_id);
create policy "used_powers_self_select" on used_powers for select using (auth.uid() = user_id);
