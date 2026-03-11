'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { mockReportData, mockContacts, mockDashboardStats } from '@/lib/mock-data';
import {
  Download,
  Calendar,
  MessageSquare,
  Mail,
  TrendingUp,
  Users,
  DollarSign,
  Target,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const kpiCards = [
  { label: 'Messages Sent', value: '4,050', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Responses', value: '2,190', icon: Mail, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Engagement Rate', value: '68.5%', icon: TrendingUp, color: 'text-gold-500', bg: 'bg-gold-500/10' },
  { label: 'Conversions', value: '297', icon: Target, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { label: 'Donations Total', value: '£39,200', icon: DollarSign, color: 'text-warm-500', bg: 'bg-warm-500/10' },
];

const funnelData = mockReportData.map(d => ({
  period: d.period,
  'Contacts': d.contacts_added,
  'Contacted': Math.round(d.contacts_added * 0.75),
  'Engaged': d.engagements,
  'Converted': d.conversions,
}));

const sourceData = [
  { name: 'Excel Upload', value: 45, color: '#D4A017' },
  { name: 'Referral', value: 25, color: '#3b82f6' },
  { name: 'Website', value: 18, color: '#8b5cf6' },
  { name: 'Social Media', value: 8, color: '#10b981' },
  { name: 'Events', value: 4, color: '#f59e0b' },
];

const donationData = mockReportData.map(d => ({
  period: d.period,
  donations: d.donations,
}));

const topContacts = [...mockContacts]
  .sort((a, b) => b.engagement_score - a.engagement_score)
  .slice(0, 6);

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('6m');

  const exportCSV = () => {
    const csvHeaders = 'Period,Contacts Added,Messages Sent,Responses,Engagements,Conversions,Donations\n';
    const csvRows = mockReportData.map(d =>
      `${d.period},${d.contacts_added},${d.messages_sent},${d.responses_received},${d.engagements},${d.conversions},${d.donations}`
    ).join('\n');
    const blob = new Blob([csvHeaders + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seek-god-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Analytics and insights for your platform</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date Range Picker */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {[
              { value: '1m', label: '1M' },
              { value: '3m', label: '3M' },
              { value: '6m', label: '6M' },
              { value: '1y', label: '1Y' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setDateRange(opt.value)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  dateRange === opt.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-card border border-border rounded-xl p-4">
              <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mb-3', kpi.bg)}>
                <Icon className={cn('w-4.5 h-4.5', kpi.color)} />
              </div>
              <p className="text-xl font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Funnel */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h3 className="text-base font-semibold mb-4">Engagement Funnel</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="Contacts" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="Contacted" stroke="#D4A017" fill="#D4A017" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="Engaged" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="Converted" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contact Sources */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-base font-semibold mb-4">Contact Sources</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {sourceData.map(s => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-medium">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donations Over Time */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-base font-semibold mb-4">Donations Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `£${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`£${value.toLocaleString()}`, 'Donations']}
                />
                <Bar dataKey="donations" fill="#D4A017" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Contacts */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-base font-semibold mb-4">Top Performing Contacts</h3>
          <div className="space-y-3">
            {topContacts.map((contact, i) => (
              <div key={contact.id} className="flex items-center gap-3">
                <span className="w-6 text-sm font-bold text-muted-foreground text-center">{i + 1}</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  {contact.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{contact.full_name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{contact.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${contact.engagement_score}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold w-8 text-right">{contact.engagement_score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
