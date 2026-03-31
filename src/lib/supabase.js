import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/*
=============================================================
  SUPABASE SQL SCHEMA — run this in the Supabase SQL Editor
=============================================================

-- 1. EVENT REGISTRATIONS
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  gender text,
  city_state text,
  participant_category text[] not null,
  org_school text,
  role_course text,
  years_experience text,
  interest_areas text[],
  attending_full boolean default true,
  how_heard text,
  accessibility text,
  pitch_startup boolean default false,
  mentorship boolean default false,
  join_community boolean default false,
  agree_updates boolean default false,
  agree_attend boolean default false
);

-- 2. VOLUNTEER APPLICATIONS
create table if not exists volunteers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null,
  age_range text not null,
  email text not null,
  phone text not null,
  location text,
  volunteer_areas text[] not null,
  skills text,
  available_may2 boolean not null,
  attend_briefing boolean not null,
  motivation text not null,
  committed boolean default false
);

-- 3. SPONSOR APPLICATIONS
create table if not exists sponsors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  org_name text not null,
  org_type text not null,
  org_type_other text,
  website text,
  address text,
  contact_name text not null,
  job_title text not null,
  email text not null,
  phone text not null,
  sponsorship_tier text not null,
  custom_budget text,
  interest_areas text[],
  how_heard text,
  outcomes text,
  info_accurate boolean default false
);

-- 4. EXHIBITOR REGISTRATIONS
create table if not exists exhibitors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  business_name text not null,
  industry text not null,
  industry_other text,
  description text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  exhibition_package text not null,
  products_services text,
  power_internet boolean default false,
  legal_compliant boolean default false,
  agreed_terms boolean default false
);

-- Enable Row Level Security (allow inserts from anon, read only for authenticated)
alter table registrations enable row level security;
alter table volunteers enable row level security;
alter table sponsors enable row level security;
alter table exhibitors enable row level security;

create policy "Allow anon insert" on registrations for insert to anon with check (true);
create policy "Allow anon insert" on volunteers for insert to anon with check (true);
create policy "Allow anon insert" on sponsors for insert to anon with check (true);
create policy "Allow anon insert" on exhibitors for insert to anon with check (true);

create policy "Allow auth read" on registrations for select to authenticated using (true);
create policy "Allow auth read" on volunteers for select to authenticated using (true);
create policy "Allow auth read" on sponsors for select to authenticated using (true);
create policy "Allow auth read" on exhibitors for select to authenticated using (true);

=============================================================
*/
