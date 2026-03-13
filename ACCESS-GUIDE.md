# Seek God Platform - Access & Login Details

## Live URLs
| Service | URL |
|---------|-----|
| **Production Site** | https://seek-god.com |
| **Vercel Fallback** | https://seek-god.vercel.app |
| **Admin Dashboard** | https://seek-god.com/dashboard |
| **Customer Portal** | https://seek-god.com/portal |
| **Content Library** | https://seek-god.com/content |
| **AI Chat** | https://seek-god.com/portal/chat |
| **Login Page** | https://seek-god.com/login |
| **Sign Up Page** | https://seek-god.com/signup |

## Service Dashboards
| Service | Dashboard URL | Purpose |
|---------|--------------|---------|
| **Vercel** | https://vercel.com/kalisiyas-projects/seek-god | Hosting, deployments, domains, environment variables |
| **Supabase** | https://supabase.com/dashboard/project/jwokqsfghrukttvjpwmo | Database, authentication, API keys, storage |
| **GitHub** | https://github.com/Kalisiyatrust/seek-god | Source code repository |
| **GoDaddy** | https://dcc.godaddy.com/control/seek-god.com/dns | Domain DNS management |

## Supabase Details
| Setting | Value |
|---------|-------|
| **Project URL** | https://jwokqsfghrukttvjpwmo.supabase.co |
| **Subdomain ID** | jwokqsfghrukttvjpwmo |
| **API Keys** | Found at: Supabase Dashboard → Settings → API |
| **Auth Redirect URI** | https://jwokqsfghrukttvjpwmo.supabase.co/auth/v1/callback |

## Vercel Environment Variables (Configured)
| Variable | Status |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Set |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Set |
| `OPENAI_API_KEY` | ❌ Not set yet (needed for live AI chat) |

## DNS Configuration (GoDaddy)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 600s |
| CNAME | www | cname.vercel-dns.com | 600s |

## Database Tables (Supabase)
| Table | Purpose |
|-------|---------|
| `profiles` | User accounts linked to Supabase Auth |
| `contacts` | Uploaded leads from Excel sheets |
| `ai_agents` | 5 AI agents (Grace, Hope, Faith, Wisdom, Compass) |
| `conversations` | Multi-channel conversation threads |
| `messages` | Individual messages in conversations |
| `content` | Content library (videos, audio, blogs, books) |
| `life_journeys` | User journey tracking (5 phases) |
| `milestones` | Journey milestone checkpoints |
| `assessments` | Purpose/wellbeing/fulfillment/generosity assessments |
| `donations` | Donation records |
| `upload_history` | Excel upload audit trail |

## User Roles
| Role | Access | How to Assign |
|------|--------|---------------|
| **admin** | Full platform access, dashboard, all contacts, all settings | Set `role = 'admin'` in `profiles` table |
| **vendor** | Vendor portal, assigned contacts, conversations | Set `role = 'vendor'` in `profiles` table |
| **customer** | Customer portal, content library, chat, journey | Default role on signup |

## To Create Your Admin Account
1. Go to https://seek-god.com/signup
2. Create an account with your email
3. In Supabase Dashboard → Table Editor → `profiles`
4. Find your row and change `role` from `customer` to `admin`
5. You now have full admin access at https://seek-god.com/dashboard

## Still Needed
- [ ] **OpenAI API Key** - Add to Vercel env vars for live AI chat
- [ ] **Google OAuth** - Set up in Google Cloud Console, add to Supabase Auth
- [ ] **SendGrid API Key** - For email outreach campaigns
- [ ] **Twilio Account** - For SMS/WhatsApp messaging
- [ ] **WhatsApp Business API** - For WhatsApp agent outreach
