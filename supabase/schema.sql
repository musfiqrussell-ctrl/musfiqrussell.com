-- ==============================================================================
-- MUSFIQ RUSSELL - PRODUCTION SUPABASE DATABASE SCHEMA & INITIAL SEED
-- ==============================================================================
-- Execute this entire script inside your Supabase Dashboard:
-- SQL Editor -> New Query -> Paste & Run.
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ADMIN USERS TABLE
-- Maps authorized admin email addresses to their administrative roles
create table if not exists public.admin_users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  role text not null default 'admin' check (role in ('superadmin', 'admin', 'editor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed primary admin owner
insert into public.admin_users (email, full_name, role)
values ('musfiqrussell@gmail.com', 'Muhammad Musfiqur Rahman Russell', 'superadmin')
on conflict (email) do update set role = 'superadmin';

-- 2. SITE SETTINGS TABLE
create table if not exists public.site_settings (
  id text primary key default 'default_settings',
  domain text not null,
  website_name text not null,
  brand_name_bn text not null,
  brand_name_en text not null,
  tagline_bn text,
  tagline_en text,
  announcement_text_bn text,
  announcement_text_en text,
  announcement_active boolean default true,
  contact_email text,
  contact_phone text,
  copyright_text_bn text,
  copyright_text_en text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PROFILES TABLE
create table if not exists public.profiles (
  id text primary key default 'owner_profile',
  full_name text not null,
  display_name_bn text not null,
  display_name_en text not null,
  professional_title_bn text,
  professional_title_en text,
  bio_bn text,
  bio_en text,
  about_intro_bn text,
  about_intro_en text,
  since_year text default '2019',
  projects_count text default '3000+',
  clients_count text default '2500+',
  avatar_url text,
  cover_url text,
  primary_mobile text,
  alternative_mobile text,
  business_mobile text,
  primary_email text,
  business_email text,
  whatsapp_url text,
  messenger_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SERVICES TABLE
create table if not exists public.services (
  id text primary key,
  number text not null,
  title_bn text not null,
  title_en text not null,
  description_bn text,
  description_en text,
  icon_name text not null,
  items_bn jsonb default '[]'::jsonb,
  items_en jsonb default '[]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. BUSINESSES TABLE
create table if not exists public.businesses (
  id text primary key,
  company_bn text not null,
  company_en text not null,
  founded text,
  position_bn text,
  position_en text,
  description_bn text,
  description_en text,
  services jsonb default '[]'::jsonb,
  phone text,
  email text,
  website text,
  facebook text,
  logo_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. EXPERIENCES TABLE
create table if not exists public.experiences (
  id text primary key,
  organization text not null,
  position text not null,
  joining_date text,
  end_date text,
  responsibilities text,
  achievements text,
  is_current boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. PORTFOLIO TABLE
create table if not exists public.portfolio (
  id text primary key,
  title_bn text not null,
  title_en text not null,
  client text not null,
  type text not null,
  role_bn text,
  role_en text,
  description_bn text,
  description_en text,
  image_url text,
  link text,
  featured boolean default false,
  date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. TESTIMONIALS TABLE
create table if not exists public.testimonials (
  id text primary key,
  client_name text not null,
  designation text,
  company text,
  feedback_bn text not null,
  feedback_en text not null,
  rating integer default 5,
  date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. FAQS TABLE
create table if not exists public.faqs (
  id text primary key,
  question_bn text not null,
  question_en text not null,
  answer_bn text not null,
  answer_en text not null,
  order_num integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. SOCIAL LINKS TABLE
create table if not exists public.social_links (
  id text primary key,
  platform text not null,
  username text not null,
  url text not null,
  icon text not null,
  description text,
  description_bn text,
  accent text,
  cta_bn text,
  cta_en text,
  category text default 'primary',
  enabled boolean default true,
  order_num integer default 0,
  featured boolean default false,
  label text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. OFFICES TABLE
create table if not exists public.offices (
  id text primary key,
  type text not null check (type in ('head', 'branch')),
  title_bn text not null,
  title_en text not null,
  company_bn text not null,
  company_en text not null,
  address_bn text not null,
  address_en text not null,
  phone text not null,
  whatsapp_url text,
  email text,
  hours_bn text,
  hours_en text,
  google_maps_url text,
  is_map_available boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. BLOG POSTS TABLE
create table if not exists public.blog_posts (
  id text primary key,
  title_bn text not null,
  title_en text not null,
  slug text unique not null,
  category text not null,
  type text default 'text',
  content_bn text not null,
  content_en text not null,
  excerpt_bn text,
  excerpt_en text,
  featured_image text,
  gallery_images jsonb default '[]'::jsonb,
  youtube_url text,
  external_url text,
  author text not null default 'Muhammad Musfiqur Rahman Russell',
  date_published text,
  tags jsonb default '[]'::jsonb,
  status text not null default 'published' check (status in ('published', 'draft', 'scheduled')),
  scheduled_date text,
  seo_title text,
  seo_description text,
  likes integer default 0,
  views integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. BLOG COMMENTS TABLE
create table if not exists public.blog_comments (
  id text primary key,
  post_id text references public.blog_posts(id) on delete cascade,
  author text not null,
  text text not null,
  date_formatted text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 14. CONTACT MESSAGES TABLE
create table if not exists public.contact_messages (
  id text primary key,
  name text not null,
  phone text not null,
  email text,
  service text not null,
  budget text,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read', 'replied')),
  date_submitted text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.businesses enable row level security;
alter table public.experiences enable row level security;
alter table public.portfolio enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.social_links enable row level security;
alter table public.offices enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_comments enable row level security;
alter table public.contact_messages enable row level security;

-- Helper function: is current user an approved admin?
create or replace function public.is_admin()
returns boolean as $$
begin
  return (
    auth.role() = 'authenticated' and (
      auth.jwt() ->> 'email' = 'musfiqrussell@gmail.com' or
      exists (
        select 1 from public.admin_users
        where email = auth.jwt() ->> 'email'
      )
    )
  );
end;
$$ language plpgsql security definer;

-- PUBLIC READ POLICIES (Everyone can read public website content)
create policy "Allow public read site_settings" on public.site_settings for select using (true);
create policy "Allow public read profiles" on public.profiles for select using (true);
create policy "Allow public read services" on public.services for select using (true);
create policy "Allow public read businesses" on public.businesses for select using (true);
create policy "Allow public read experiences" on public.experiences for select using (true);
create policy "Allow public read portfolio" on public.portfolio for select using (true);
create policy "Allow public read testimonials" on public.testimonials for select using (true);
create policy "Allow public read faqs" on public.faqs for select using (true);
create policy "Allow public read social_links" on public.social_links for select using (true);
create policy "Allow public read offices" on public.offices for select using (true);
create policy "Allow public read blog_posts" on public.blog_posts for select using (status = 'published');
create policy "Allow public read blog_comments" on public.blog_comments for select using (true);

-- PUBLIC INSERT POLICIES (Visitors can submit contact briefs and blog comments)
create policy "Allow public insert contact_messages" on public.contact_messages
  for insert with check (true);

create policy "Allow public insert blog_comments" on public.blog_comments
  for insert with check (true);

create policy "Allow public like blog_posts" on public.blog_posts
  for update using (true) with check (true);

-- ADMIN FULL ACCESS POLICIES (Admins can read, create, update, delete everything)
create policy "Admin full access admin_users" on public.admin_users for all using (public.is_admin());
create policy "Admin full access site_settings" on public.site_settings for all using (public.is_admin());
create policy "Admin full access profiles" on public.profiles for all using (public.is_admin());
create policy "Admin full access services" on public.services for all using (public.is_admin());
create policy "Admin full access businesses" on public.businesses for all using (public.is_admin());
create policy "Admin full access experiences" on public.experiences for all using (public.is_admin());
create policy "Admin full access portfolio" on public.portfolio for all using (public.is_admin());
create policy "Admin full access testimonials" on public.testimonials for all using (public.is_admin());
create policy "Admin full access faqs" on public.faqs for all using (public.is_admin());
create policy "Admin full access social_links" on public.social_links for all using (public.is_admin());
create policy "Admin full access offices" on public.offices for all using (public.is_admin());
create policy "Admin full access blog_posts" on public.blog_posts for all using (public.is_admin());
create policy "Admin full access blog_comments" on public.blog_comments for all using (public.is_admin());
create policy "Admin full access contact_messages" on public.contact_messages for all using (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS (Execute in Supabase Storage or via SQL)
-- ==============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

-- Storage public read policy
create policy "Public Access to media bucket"
on storage.objects for select
using ( bucket_id in ('media', 'portfolio', 'avatars') );

-- Storage upload policy for admins
create policy "Admin Upload to media buckets"
on storage.objects for insert
with check (
  bucket_id in ('media', 'portfolio', 'avatars')
  and (auth.role() = 'authenticated')
);

create policy "Admin Update/Delete in media buckets"
on storage.objects for all
using (
  bucket_id in ('media', 'portfolio', 'avatars')
  and (auth.role() = 'authenticated')
);

-- ==============================================================================
-- INITIAL SEED WITH VERIFIED REAL OWNER DATA
-- ==============================================================================

-- Site Settings
insert into public.site_settings (
  id, domain, website_name, brand_name_bn, brand_name_en, tagline_bn, tagline_en,
  announcement_text_bn, announcement_text_en, announcement_active,
  contact_email, contact_phone, copyright_text_bn, copyright_text_en
) values (
  'default_settings',
  'musfiqrussell.com',
  'musfiqrussell.com',
  'মুশফিক রাসেল',
  'Musfiq Russell',
  'সৃজনশীলতায় ব্রান্ড গড়ি, বিজ্ঞাপনে পৌঁছে দেই, কলমে তুলে ধরি সময়ের কথা',
  'Crafting brands with creativity, amplifying with advertising, voicing contemporary times with pen',
  'নতুন প্রজেক্ট ও বিজ্ঞাপনী ক্যাম্পেইনের জন্য বুকিং চলছে',
  'Accepting bookings for new graphic design & advertising campaigns',
  true,
  'musfiqrussell@gmail.com',
  '01315-461200',
  'সর্বস্বত্ব সংরক্ষিত। কুতুবে রাব্বানী আইটি সলিউশন সহযোগী প্রতিষ্ঠান।',
  'All Rights Reserved. In association with Qutube Rabbani IT Solution.'
) on conflict (id) do nothing;

-- Profiles
insert into public.profiles (
  id, full_name, display_name_bn, display_name_en,
  professional_title_bn, professional_title_en,
  bio_bn, bio_en, about_intro_bn, about_intro_en,
  since_year, projects_count, clients_count,
  avatar_url, primary_mobile, alternative_mobile, business_mobile,
  primary_email, business_email, whatsapp_url, messenger_url
) values (
  'owner_profile',
  'Muhammad Musfiqur Rahman Russell',
  'মুশফিক রাসেল',
  'Musfiq Russell',
  'গ্রাফিক্স ডিজাইনার | বিজ্ঞাপন বিশেষজ্ঞ | ডকুমেন্ট কনসালটেন্ট',
  'Graphics Designer | Advertising Expert | Document Consultant',
  'সৃজনশীলতায় ব্রান্ড গড়ি, বিজ্ঞাপনে পৌঁছে দেই, কলমে তুলে ধরি সময়ের কথা',
  'Crafting brands with creativity, amplifying through advertising, expressing contemporary stories.',
  'আমি মুহাম্মদ মুশফিকুর রহমান রাসেল। ২০১৯ সাল থেকে পেশাদার গ্রাফিক্স ডিজাইন, ডিজিটাল বিজ্ঞাপন ক্যাম্পেইন পরিচালনা এবং অফিশিয়াল ডকুমেন্ট কনসালটেন্সির সাথে যুক্ত আছি। দেশি ও আন্তর্জাতিক ২৫০০+ এর বেশি সম্মানিত ক্লায়েন্ট এবং ৩০০০+ এর অধিক সফল প্রজেক্ট সম্পন্নের অভিজ্ঞতা নিয়ে আপনার প্রতিষ্ঠানের প্রচার ও প্রসারকে অনন্য উচ্চতায় নিয়ে যেতে আমি সর্বদা প্রস্তুত।',
  'I am Muhammad Musfiqur Rahman Russell. Active since 2019, I specialize in professional graphic design, high-converting digital advertising campaigns, and official document consultancy. With a track record of 3000+ completed projects and 2500+ satisfied clients, I am committed to elevating your brand.',
  '2019',
  '3000+',
  '2500+',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
  '01315-461200',
  '01581-797280',
  '01826-319204',
  'musfiqrussell@gmail.com',
  'qutuberabbaniitsolution@gmail.com',
  'https://wa.link/717iwz',
  'https://m.me/MusfiqRussell'
) on conflict (id) do nothing;

-- Head Office & Branch Office
insert into public.offices (
  id, type, title_bn, title_en, company_bn, company_en,
  address_bn, address_en, phone, whatsapp_url, email,
  hours_bn, hours_en, google_maps_url, is_map_available
) values (
  'office-head',
  'head',
  'প্রধান কার্যালয় (Head Office)',
  'Head Office',
  'কুতুবে রাব্বানী আইটি সলিউশন',
  'Qutube Rabbani IT Solution',
  'আঞ্চলিক পাসপোর্ট অফিস সংলগ্ন, সোনালী মার্কেট, রঘুনাথপুর, নারায়ণগঞ্জ সদর, নারায়ণগঞ্জ - ১৪২১',
  'Adjacent to Regional Passport Office, Sonali Market, Raghunathpur, Narayanganj Sadar, Narayanganj - 1421',
  '01826-319204',
  'https://wa.link/te7q7w',
  'qutuberabbaniitsolution@gmail.com',
  'সকাল ৯টা থেকে বিকাল ৫টা',
  '9:00 AM - 5:00 PM',
  '',
  false
), (
  'office-branch',
  'branch',
  'শাখা কার্যালয় (Branch Office)',
  'Branch Office',
  'কুতুবে রাব্বানী আইটি সলিউশন',
  'Qutube Rabbani IT Solution',
  'মুন্সী বাড়ীর দরজা, কুতুবশাহ বাজার, চরটিটিয়া দেউলা ইউনিয়ন, ওয়ার্ড নং - ৮, বোরহানউদ্দীন, ভোলা - ৮৩২০',
  'Munshi Bari Gate, Kutubshah Bazar, Char Titia Deula Union, Ward No - 8, Borhanuddin, Bhola - 8320',
  '01826-319204',
  'https://wa.link/te7q7w',
  'qutuberabbaniitsolution@gmail.com',
  'সকাল ৯টা থেকে রাত ১০টা',
  '9:00 AM - 10:00 PM',
  'https://share.google/UWUz9tNyQBipduwk6',
  true
) on conflict (id) do nothing;
