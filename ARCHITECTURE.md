# Seek God Platform - Architecture

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL)  
- **Auth**: Supabase Auth (email/password, Google, magic link)
- **AI**: OpenAI API via Vercel AI SDK
- **Deployment**: Vercel + seek-god.com domain
- **Messaging**: WhatsApp Business API, SendGrid (email), Twilio (SMS)

## User Roles
1. **Admin** - Platform owner, manages everything
2. **Vendor** - Partners/coaches who use the platform 
3. **Customer** - End users who receive value

## Key Features
1. **Public Landing Page** - Motivational, SEO-optimized
2. **Content Library** - Video summaries, audio, blogs, book summaries
3. **AI Chat** - Available without login (basic) and with login (personalized)
4. **Admin Dashboard** - Upload contacts, manage AI agents, view reports
5. **Vendor Portal** - Manage assigned contacts, track conversations
6. **Customer Portal** - Personal journey, content library, chat, profile
7. **AI Agents** - Outreach, followup, chat, content curation
8. **Reporting** - Charts, analytics, engagement metrics

## Design Philosophy
- Warm, spiritual, trustworthy (gold/amber/warm palette)
- Serif display font (Playfair Display) for headings
- Sans-serif (Inter) for body
- Dark mode support
- Peaceful, calming UX with purposeful animations
