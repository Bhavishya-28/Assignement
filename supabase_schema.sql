-- Nuzio AI - Supabase Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  email text,
  avatar_url text,
  profession text,
  language text default 'en',
  voice text default 'Aria',
  brief_time text default '07:00',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. User Interests Table
create table public.user_interests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  interest text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, interest)
);

-- 3. News Table (Cache for our backend)
create table public.news (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  content text,
  category text,
  source text,
  url text,
  image_url text,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)

-- Profiles
alter table public.profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- User Interests
alter table public.user_interests enable row level security;
create policy "Users can view own interests" on user_interests for select using (auth.uid() = user_id);
create policy "Users can insert own interests" on user_interests for insert with check (auth.uid() = user_id);
create policy "Users can delete own interests" on user_interests for delete using (auth.uid() = user_id);

-- News (Read-only for authenticated users, managed by backend)
alter table public.news enable row level security;
create policy "Anyone can read news" on news for select to authenticated using (true);
-- Backend service key will bypass RLS for inserts/updates

-- Function to handle new user signup automatically
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
