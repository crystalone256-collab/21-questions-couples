-- Run this once in Supabase Dashboard > SQL Editor.
-- The app accesses this table only through server-side API routes using the service-role key.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY in a NEXT_PUBLIC_ variable.

create extension if not exists pgcrypto;

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  creator_name text not null check (char_length(creator_name) between 1 and 40),
  answers jsonb not null check (jsonb_typeof(answers) = 'array' and jsonb_array_length(answers) = 21),
  created_at timestamptz not null default now()
);

alter table public.challenges enable row level security;

-- No public policies are intentionally created.
-- The server-side service role bypasses RLS. Never use the service-role key in browser code.

create index if not exists challenges_created_at_idx on public.challenges (created_at desc);
