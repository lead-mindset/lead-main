-- Public website contact + partnership submissions (metrics + reach-out tracking).
-- Targets lead-platform-v2. Written by /api/contact via the service role key;
-- anonymous public input, so no user_id — not readable by the public.

create table if not exists public.contact_submission (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  intent text not null check (intent in ('chapter_interest', 'partnership')),
  name text,
  email text,
  organization text,
  university text,
  location text,
  region text,
  profile text,
  payload jsonb,
  recipient text,
  delivered boolean not null default false,
  email_id text,
  error text,
  status text not null default 'new',
  review_notes text
);

create index if not exists contact_submission_intent_created_at_idx
  on public.contact_submission (intent, created_at desc);

alter table public.contact_submission enable row level security;
-- No policies on purpose: only the service role (server) reads/writes.
