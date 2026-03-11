# Seek God - Discover Your Life Purpose

A motivational, life-changing platform that connects with people who may not realize they need help. We help them find peace, discover their purpose, and encourage participation in changing other lives through giving.

## Features

### Public Platform
- **Content Library** — AI-curated video summaries, audio meditations, blog articles, and book summaries
- **AI Chat** — Talk to compassionate AI guides without signing up
- **Life Journey Framework** — 5-phase transformation: Discovery → Awareness → Transformation → Purpose → Giving

### Admin Portal
- **Contact Management** — Upload Excel sheets, manage leads, track engagement
- **AI Agent Management** — Configure 5 specialized AI agents (Grace, Hope, Faith, Wisdom, Compass)
- **Reporting Dashboard** — Real-time analytics, engagement funnels, donation tracking
- **Multi-channel Outreach** — Email, WhatsApp, SMS, Facebook, platform chat

### Customer Portal
- **Personal Journey** — Track your growth through milestones and assessments
- **Personalized Content** — AI-recommended content based on your journey phase
- **AI Companions** — Chat with Faith (guidance), Wisdom (content), Hope (encouragement)
- **Donation Portal** — Easy giving to causes that matter

### AI Agents
| Agent | Role | Channels |
|-------|------|----------|
| **Grace** | Initial outreach — warm, personalized connection | Email, WhatsApp |
| **Hope** | Follow-up — nurturing relationships | Email, WhatsApp, SMS |
| **Faith** | Real-time chat — 24/7 guidance | Platform Chat |
| **Wisdom** | Content curation — personalized recommendations | Email, Chat |
| **Compass** | Analytics — engagement insights | Internal |

## Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI**: OpenAI API via Vercel AI SDK
- **Charts**: Recharts
- **Deployment**: Vercel

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Kalisiyatrust/seek-god.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your Supabase and API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `OPENAI_API_KEY` | OpenAI API key for AI agents |

## Domain
Production: [seek-god.com](https://seek-god.com)

## License
Private - All rights reserved © 2026 Seek God
