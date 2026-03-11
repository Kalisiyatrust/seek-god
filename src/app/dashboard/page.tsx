'use client';

import { useState } from 'react';
import { cn, formatRelativeTime, getInitials } from '@/lib/utils';
import { mockDashboardStats, mockReportData, mockContacts, mockAIAgents } from '@/lib/mock-data';
import {
  Users,
  MessageSquare,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Activity,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const stats = [
  {
    label: 'Total Contacts',
    value: mockDashboardStats.total_contacts.toLocaleString(),
    icon: Users,
    trend: '+12.5%',
    trendUp: true,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    label: 'Active Conversations',
    value: mockDashboardStats.active_conversations.toLocaleString(),
    icon: MessageSquare,
    trend: '+8.2%',
    trendUp: true,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    label: 'Engagement Rate',
    value: `${mockDashboardStats.engagement_rate}%`,
    icon: TrendingUp,
    trend: '+3.1%',
    trendUp: true,
    color: 'text-gold-500',
    bg: 'bg-gold-500/10',
  },
  {
    label: 'Total Donations',
    value: `£${mockDashboardStats.total_donations.toLocaleString()}`,
    icon: DollarSign,
    trend: '-2.4%',
    trendUp: false,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  engaged: 'bg-emerald-100 text-emerald-700',
  converted: 'bg-purple-100 text-purple-700',
  inactive: 'bg-gray-100 text-gray-600',
};

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-display">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className={cn('p-2.5 rounded-lg', stat.bg)}>
                  <Icon className={cn('w-5 h-5', stat.color)} />
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
                  stat.trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
                )}>
                  {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Over Time */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-base font-semibold mb-4">Engagement Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockReportData}>
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
                <Line type="monotone" dataKey="engagements" name="Engagements" stroke="#D4A017" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="conversions" name="Conversions" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="contacts_added" name="New Contacts" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Messages Sent vs Responses */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-base font-semibold mb-4">Messages Sent vs Responses</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockReportData}>
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
                <Bar dataKey="messages_sent" name="Messages Sent" fill="#D4A017" radius={[4, 4, 0, 0]} />
                <Bar dataKey="responses_received" name="Responses" fill="#D4A017" fillOpacity={0.4} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contacts */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Recent Contacts</h3>
            <a href="/dashboard/contacts" className="text-sm text-primary hover:underline">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">Email</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden md:table-cell">Score</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden lg:table-cell">Last Contact</th>
                </tr>
              </thead>
              <tbody>
                {mockContacts.slice(0, 5).map((contact) => (
                  <tr key={contact.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {getInitials(contact.full_name)}
                        </div>
                        <span className="font-medium">{contact.full_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{contact.email}</td>
                    <td className="py-3 px-2">
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium capitalize', statusColors[contact.status])}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${contact.engagement_score}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{contact.engagement_score}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground text-xs hidden lg:table-cell">
                      {contact.last_contacted ? formatRelativeTime(contact.last_contacted) : 'Never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active AI Agents */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">AI Agents</h3>
            <a href="/dashboard/agents" className="text-sm text-primary hover:underline">Manage</a>
          </div>
          <div className="space-y-3">
            {mockAIAgents.filter(a => a.type !== 'analytics').map((agent) => (
              <div key={agent.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{agent.name}</span>
                    <span className={cn(
                      'w-2 h-2 rounded-full',
                      agent.is_active ? 'bg-emerald-500' : 'bg-gray-400'
                    )} />
                  </div>
                  <p className="text-xs text-muted-foreground capitalize">{agent.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{agent.stats.engagement_rate}%</p>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
