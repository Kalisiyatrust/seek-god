'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Megaphone,
  Target,
  Mail,
  Share2,
  Search,
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  Edit2,
  Copy,
  Trash2,
  Plus,
  Filter,
  Calendar,
  Globe,
  Instagram,
  Youtube,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const kpis = [
  { label: 'Total Reach', value: '128.4K', change: +12.3, icon: Eye },
  { label: 'Engagement Rate', value: '4.8%', change: +0.6, icon: MousePointer },
  { label: 'Conversions', value: '1,247', change: +18.2, icon: Target },
  { label: 'Email Subscribers', value: '8,932', change: +5.1, icon: Mail },
  { label: 'Ad Spend', value: '£2,450', change: -3.2, icon: DollarSign },
  { label: 'ROI', value: '340%', change: +22.0, icon: TrendingUp },
];

const campaigns = [
  { id: '1', name: 'Easter Purpose Series', status: 'active', platform: 'Multi', budget: '£800', spent: '£542', reach: '34.2K', conversions: 312, startDate: '2026-03-01', endDate: '2026-04-20' },
  { id: '2', name: 'Book Club Launch', status: 'active', platform: 'Email', budget: '£200', spent: '£180', reach: '12.8K', conversions: 89, startDate: '2026-02-15', endDate: '2026-03-31' },
  { id: '3', name: 'New Year Intentions', status: 'completed', platform: 'Social', budget: '£500', spent: '£500', reach: '45.1K', conversions: 534, startDate: '2026-01-01', endDate: '2026-01-31' },
  { id: '4', name: 'Generosity Month', status: 'scheduled', platform: 'Multi', budget: '£600', spent: '£0', reach: '—', conversions: 0, startDate: '2026-04-01', endDate: '2026-04-30' },
  { id: '5', name: 'Summer Retreat Promo', status: 'draft', platform: 'Social', budget: '£1,000', spent: '£0', reach: '—', conversions: 0, startDate: '2026-06-01', endDate: '2026-06-30' },
];

const audienceSegments = [
  { name: 'New Seekers', value: 3200, color: '#d4a036' },
  { name: 'Active Learners', value: 2800, color: '#b8860b' },
  { name: 'Community Builders', value: 1500, color: '#8b6914' },
  { name: 'Premium Members', value: 900, color: '#6b4f12' },
  { name: 'Dormant', value: 532, color: '#c4b5a0' },
];

const leadScores = [
  { range: '0-20', count: 1200 },
  { range: '21-40', count: 2100 },
  { range: '41-60', count: 3400 },
  { range: '61-80', count: 1800 },
  { range: '81-100', count: 432 },
];

const emailTemplates = [
  { id: '1', name: 'Welcome Series - Day 1', subject: 'Your journey begins today', openRate: 68, clickRate: 24, status: 'active' },
  { id: '2', name: 'Welcome Series - Day 3', subject: 'Discover your first lesson', openRate: 52, clickRate: 18, status: 'active' },
  { id: '3', name: 'Weekly Digest', subject: 'This week on Seek God', openRate: 41, clickRate: 12, status: 'active' },
  { id: '4', name: 'Re-engagement', subject: 'We miss you — come back to your journey', openRate: 35, clickRate: 9, status: 'draft' },
  { id: '5', name: 'Easter Campaign', subject: 'The meaning of sacrifice and purpose', openRate: 0, clickRate: 0, status: 'scheduled' },
];

const socialMetrics = [
  { platform: 'Instagram', followers: '12.4K', engagement: '5.2%', posts: 48, icon: Instagram, color: 'from-pink-500 to-purple-500' },
  { platform: 'YouTube', followers: '8.1K', engagement: '3.8%', posts: 24, icon: Youtube, color: 'from-red-500 to-red-600' },
  { platform: 'Facebook', followers: '15.2K', engagement: '2.1%', posts: 62, icon: Globe, color: 'from-blue-500 to-blue-600' },
  { platform: 'X / Twitter', followers: '6.7K', engagement: '1.9%', posts: 120, icon: Share2, color: 'from-gray-700 to-gray-900' },
];

const trafficData = [
  { month: 'Oct', organic: 4200, paid: 1800, social: 2400, referral: 800 },
  { month: 'Nov', organic: 4800, paid: 2200, social: 2800, referral: 900 },
  { month: 'Dec', organic: 5100, paid: 1600, social: 3200, referral: 1100 },
  { month: 'Jan', organic: 5800, paid: 2400, social: 3600, referral: 1200 },
  { month: 'Feb', organic: 6200, paid: 2800, social: 3400, referral: 1400 },
  { month: 'Mar', organic: 6900, paid: 3100, social: 4100, referral: 1600 },
];

const topKeywords = [
  { keyword: 'find life purpose', position: 3, volume: 8100, change: +2 },
  { keyword: 'seek god meaning', position: 1, volume: 2400, change: 0 },
  { keyword: 'spiritual guidance online', position: 5, volume: 6500, change: +1 },
  { keyword: 'purpose driven life', position: 12, volume: 14800, change: -3 },
  { keyword: 'discover your calling', position: 7, volume: 4200, change: +4 },
];

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
/* ------------------------------------------------------------------ */

const tabs = [
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { id: 'audience', label: 'Audience', icon: Users },
  { id: 'leads', label: 'Lead Scoring', icon: Target },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'seo', label: 'SEO & Analytics', icon: Search },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    scheduled: 'bg-yellow-100 text-yellow-700',
    draft: 'bg-gray-100 text-gray-500',
  };
  const icons: Record<string, React.ReactNode> = {
    active: <Play className="w-3 h-3" />,
    completed: <CheckCircle2 className="w-3 h-3" />,
    scheduled: <Clock className="w-3 h-3" />,
    draft: <Edit2 className="w-3 h-3" />,
  };
  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize', styles[status] || styles.draft)}>
      {icons[status]} {status}
    </span>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState('campaigns');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Marketing</h1>
          <p className="text-sm text-muted-foreground">Campaigns, audience, and growth analytics</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const positive = kpi.change >= 0;
          return (
            <div key={kpi.label} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', positive ? 'text-green-600' : 'text-red-500')}>
                  {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(kpi.change)}%
                </span>
              </div>
              <p className="text-lg font-bold">{kpi.value}</p>
              <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border rounded-xl">
        {/* ---- CAMPAIGNS ---- */}
        {activeTab === 'campaigns' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Campaign</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Platform</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Budget</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Spent</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Reach</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Conversions</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.startDate} → {c.endDate}</p>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{c.platform}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{c.budget}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{c.spent}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">{c.reach}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">{c.conversions}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded hover:bg-muted"><Edit2 className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button className="p-1.5 rounded hover:bg-muted"><Copy className="w-3.5 h-3.5 text-muted-foreground" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ---- AUDIENCE ---- */}
        {activeTab === 'audience' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Audience Segments</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={audienceSegments} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {audienceSegments.map((s, i) => (
                        <Cell key={i} fill={s.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {audienceSegments.map((seg) => (
                  <div key={seg.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
                      <span className="text-sm font-medium">{seg.name}</span>
                    </div>
                    <span className="text-sm font-bold">{seg.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---- LEAD SCORING ---- */}
        {activeTab === 'leads' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Lead Score Distribution</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(36, 80%, 42%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-2xl font-bold text-green-700">432</p>
                <p className="text-xs text-green-600">Hot Leads (81-100)</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-2xl font-bold text-yellow-700">1,800</p>
                <p className="text-xs text-yellow-600">Warm Leads (61-80)</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-2xl font-bold text-gray-700">6,700</p>
                <p className="text-xs text-gray-500">Total in Pipeline</p>
              </div>
            </div>
          </div>
        )}

        {/* ---- EMAIL ---- */}
        {activeTab === 'email' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Template</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Subject Line</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Open Rate</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Click Rate</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {emailTemplates.map((t) => (
                  <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{t.name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{t.subject}</td>
                    <td className="px-4 py-3">{t.openRate > 0 ? `${t.openRate}%` : '—'}</td>
                    <td className="px-4 py-3">{t.clickRate > 0 ? `${t.clickRate}%` : '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ---- SOCIAL ---- */}
        {activeTab === 'social' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Social Media Overview</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {socialMetrics.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.platform} className="rounded-xl border border-border p-4">
                    <div className={cn('w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mb-3', s.color)}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-semibold">{s.platform}</p>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between"><span>Followers</span><span className="font-medium text-foreground">{s.followers}</span></div>
                      <div className="flex justify-between"><span>Engagement</span><span className="font-medium text-foreground">{s.engagement}</span></div>
                      <div className="flex justify-between"><span>Posts</span><span className="font-medium text-foreground">{s.posts}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---- SEO & ANALYTICS ---- */}
        {activeTab === 'seo' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="organic" stackId="1" stroke="#d4a036" fill="#d4a036" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="paid" stackId="1" stroke="#8b6914" fill="#8b6914" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="social" stackId="1" stroke="#b8860b" fill="#b8860b" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="referral" stackId="1" stroke="#c4b5a0" fill="#c4b5a0" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Top Keywords</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-3 font-medium text-muted-foreground">Keyword</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Position</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Search Volume</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topKeywords.map((kw) => (
                      <tr key={kw.keyword} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="px-4 py-3 font-medium">{kw.keyword}</td>
                        <td className="px-4 py-3">#{kw.position}</td>
                        <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{kw.volume.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          {kw.change !== 0 && (
                            <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium', kw.change > 0 ? 'text-green-600' : 'text-red-500')}>
                              {kw.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {Math.abs(kw.change)}
                            </span>
                          )}
                          {kw.change === 0 && <span className="text-xs text-muted-foreground">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
