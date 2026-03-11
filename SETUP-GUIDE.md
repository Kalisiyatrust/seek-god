# Seek God Platform - Setup Guide

## What's Been Built

### Pages (32 total)
| Section | Pages | Status |
|---------|-------|--------|
| **Landing** | Homepage, About | Live |
| **Auth** | Login, Sign Up, Callback | Live |
| **Content Library** | Main, Videos, Audio, Blogs, Books | Live |
| **Admin Dashboard** | Overview, Contacts, Upload Data, AI Agents, Conversations, Content, Reports, Settings | Live |
| **Customer Portal** | Dashboard, My Journey, Library, Chat, Profile | Live |
| **API Routes** | /api/ai, /api/ai/followup, /api/contacts, /api/content, /api/messages, /api/upload, /api/auth/callback | Live |

### AI Agents
| Agent | Role | Channels |
|-------|------|----------|
| Grace | Initial outreach | Email, WhatsApp |
| Hope | Follow-up nurturing | Email, WhatsApp, SMS |
| Faith | Real-time chat (24/7) | Platform Chat |
| Wisdom | Content curation | Email, Chat |
| Compass | Analytics & insights | Internal |

---

## Next Steps to Complete

### 1. Configure Supabase Database
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Open your project's **SQL Editor**
3. Copy and run the contents of `supabase/schema.sql`
4. Go to **Settings → API** and copy your URL and anon key

### 2. Set Environment Variables in Vercel
Go to [Vercel Dashboard → seek-god → Settings → Environment Variables](https://vercel.com/kalisiyas-projects/seek-god/settings/environment-variables) and add:

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API (secret) |
| `OPENAI_API_KEY` | [OpenAI Platform](https://platform.openai.com/api-keys) |

### 3. Configure seek-god.com DNS
Your domain registrar needs these DNS records pointing to Vercel:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### 4. Set Up Messaging (When Ready)
- **Email**: Sign up at [SendGrid](https://sendgrid.com) or [Elastic Email](https://elasticemail.com)
- **WhatsApp**: Set up [WhatsApp Business API](https://business.whatsapp.com/products/business-platform)
- **SMS**: Sign up at [Twilio](https://twilio.com)

### 5. Enable Google Auth in Supabase
1. Go to Supabase → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Set redirect URL to `https://seek-god.com/auth/callback`

---

## Architecture

```
seek-god.com
├── / (Landing page - public)
├── /about (About page - public)
├── /content/* (Content library - public)
├── /login, /signup (Authentication)
├── /dashboard/* (Admin portal - admin only)
│   ├── Overview with KPIs and charts
│   ├── Contacts management with Excel upload
│   ├── AI Agent configuration
│   ├── Conversations viewer
│   ├── Reporting dashboard
│   └── Settings
├── /portal/* (Customer portal - logged in users)
│   ├── Personal dashboard with daily quotes
│   ├── Life journey tracker (5 phases)
│   ├── Personal content library
│   ├── AI Chat (Faith, Wisdom, Hope)
│   └── Profile management
└── /api/* (Backend APIs)
    ├── AI chat & follow-up endpoints
    ├── Contact management
    ├── Content CRUD
    ├── File upload parsing
    └── Auth callback
```

## Tech Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with warm gold/amber design system
- **Supabase** (PostgreSQL + Auth + Storage)
- **Recharts** for analytics dashboards
- **Framer Motion** for animations
- **xlsx** library for Excel parsing
- **Vercel** for hosting
- **GitHub** for version control
