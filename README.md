# Musfiq Russell — Official Portfolio & CMS

Production-ready personal portfolio, corporate consultancy, and dynamic content management system for **Musfiq Russell** (Managing Director, Media Line Ltd.). Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Supabase**, configured for seamless deployment on **Netlify**.

---

## 🚀 Features

- **Full-Featured Showcase**: Personal profile, 18+ years executive experience, business consultancy services, and portfolio showcase.
- **Bilingual Experience**: Full Bengali (বাংলা) and English language localization.
- **Supabase Cloud Backend**:
  - **Authentication**: Secure admin login via Supabase Auth with Row-Level Security (RLS).
  - **Dynamic Tables**: Real-time management of Blog Posts, Portfolio Works, Services, Testimonials, Offices, and Social Links.
  - **Direct Lead Capture**: Customer contact submissions stored directly in Supabase `contact_messages` table.
  - **Media Storage**: Supabase Storage buckets for uploading portfolio and article assets.
  - **Hybrid Offline Resilience**: Seamless fallback to cached local state when Supabase environment variables are not yet configured.
- **Mobile & Tablet Optimized**: Responsive layout with touch-friendly drawer navigation.
- **Production Build Ready**: Pre-configured `netlify.toml` and `public/_redirects` for Single Page Application (SPA) routing.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Setting Up Supabase](#setting-up-supabase)
   - [1. Create Supabase Project](#1-create-supabase-project)
   - [2. Run Database Schema](#2-run-database-schema)
   - [3. Configure Storage Buckets](#3-configure-storage-buckets)
   - [4. Create Admin User](#4-create-admin-user)
5. [Running the Project Locally](#running-the-project-locally)
6. [Building for Production](#building-for-production)
7. [Deploying to Netlify](#deploying-to-netlify)
8. [Security & Best Practices](#security--best-practices)

---

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` or `pnpm` / `yarn`
- A free account on [Supabase](https://supabase.com/)
- A free account on [Netlify](https://www.netlify.com/)

---

## 📦 Installation

1. Clone or download the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd musfiq-russell-portfolio
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

---

## 🔑 Environment Variables

The project uses client-side environment variables exposed via Vite (`VITE_` prefix).

1. Duplicate `.env.example` to create a local `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your Supabase project credentials:
   ```env
   # Your Supabase Project URL (from Supabase Dashboard -> Settings -> API)
   VITE_SUPABASE_URL=https://your-project-id.supabase.co

   # Your Supabase Anonymous Public Key (from Supabase Dashboard -> Settings -> API)
   VITE_SUPABASE_ANON_KEY=your-anon-public-api-key-here
   ```

> ⚠️ **CRITICAL SECURITY NOTE**: Never commit `.env` with live keys to Git. Never use or expose `SUPABASE_SERVICE_ROLE_KEY` inside client-side applications.

---

## 🗄 Setting Up Supabase

### 1. Create Supabase Project
1. Log in to [supabase.com](https://supabase.com/) and click **"New Project"**.
2. Give your project a name (e.g., `musfiq-russell-portfolio`), select a region close to your target audience (e.g., Singapore or Mumbai), and set a database password.

### 2. Run Database Schema
1. In your Supabase Dashboard, click on the **SQL Editor** tab on the left sidebar.
2. Click **"New query"**.
3. Open the file `supabase/schema.sql` from this repository, copy its entire content, paste it into the query editor, and click **Run**.
4. This script automatically creates:
   - `profiles`
   - `services`
   - `portfolio_items`
   - `blog_posts`
   - `testimonials`
   - `social_links`
   - `offices`
   - `contact_messages`
   - Row-Level Security (RLS) policies for each table
   - An `is_admin()` SQL verification function

### 3. Configure Storage Buckets
1. In the Supabase Dashboard, go to **Storage**.
2. Click **"New bucket"** and create the following buckets:
   - `portfolio` (toggle **Public bucket** ON)
   - `blog` (toggle **Public bucket** ON)
   - `media` (toggle **Public bucket** ON)
3. Ensure the policies allow public reads so your visitors can view uploaded images.

### 4. Create Admin User
1. In the Supabase Dashboard, go to **Authentication** -> **Users**.
2. Click **"Add user"** -> **"Create user"**.
3. Set the email to:
   ```
   musfiqrussell@gmail.com
   ```
4. Enter a strong password of your choice.
5. Check **"Auto Confirm User"** so the user is immediately active.
6. The user can now log into the `/admin` portal using these credentials with full Supabase session authentication.

---

## 💻 Running the Project Locally

To start the Vite development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) in your browser.

---

## 🏗 Building for Production

To create an optimized production build:

```bash
npm run build
```

This compiles TypeScript, bundles all assets, and outputs static production files to the `dist/` directory.

To test the compiled build locally:
```bash
npm run preview
```

---

## 🌐 Deploying to Netlify

### Option A: Deploy via GitHub (Recommended)

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to your [Netlify Dashboard](https://app.netlify.com/).
3. Click **"Add new site"** -> **"Import an existing project"**.
4. Select your repository.
5. Netlify will automatically detect the configuration from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Site configuration"** -> **"Environment variables"**, and add:
   - `VITE_SUPABASE_URL`: (Your Supabase project URL)
   - `VITE_SUPABASE_ANON_KEY`: (Your Supabase Anon public key)
7. Click **"Deploy site"**. Netlify will build and deploy your project with SSL enabled.

### Option B: Deploy via Netlify CLI

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy to production:
   ```bash
   netlify deploy --prod --dir=dist
   ```

---

## 🔐 Security & Best Practices

- **Row Level Security (RLS)**: Public visitors have read-only access to published blog posts, active services, and portfolios. Inquiries (`contact_messages`) can be inserted by the public, but can only be read or deleted by authenticated administrators.
- **Service Role Key Safety**: The application code strictly uses the anonymous public key (`VITE_SUPABASE_ANON_KEY`). The service-role key is never included or referenced.
- **Zero Mock Data in Production**: All placeholder demo content has been removed. The website uses verified personal and corporate credentials for Musfiq Russell.
- **SPA Fallback**: `_redirects` and `netlify.toml` ensure client-side routing works smoothly across page refreshes.

---

## 📞 Support & Contacts

For any business inquiries or technical consultancy:
- **Managing Director**: Musfiq Russell
- **Company**: Media Line Ltd.
- **Phone**: +880 1711-200282
- **Email**: musfiqrussell@gmail.com / info@musfiqrussell.com
- **Offices**: Purana Paltan & Segunbagicha, Dhaka, Bangladesh
