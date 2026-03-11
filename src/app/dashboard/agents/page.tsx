'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { mockAIAgents } from '@/lib/mock-data';
import { AIAgent } from '@/types';
import {
  Bot,
  MessageSquare,
  TrendingUp,
  Zap,
  X,
  Clock,
  Mail,
  MessageCircle,
  Smartphone,
  Monitor,
  BarChart3,
  Users,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const typeColors: Record<string, string> = {
  outreach: 'bg-blue-100 text-blue-700',
  followup: 'bg-emerald-100 text-emerald-700',
  chat: 'bg-purple-100 text-purple-700',
  content: 'bg-gold-100 text-gold-700',
  analytics: 'bg-gray-100 text-gray-700',
};

const typeIcons: Record<string, React.ReactNode> = {
  outreach: <Zap className="w-4 h-4" />,
  followup: <MessageSquare className="w-4 h-4" />,
  chat: <Monitor className="w-4 h-4" />,
  content: <BarChart3 className="w-4 h-4" />,
  analytics: <TrendingUp className="w-4 h-4" />,
};

const channelIcons: Record<string, { icon: React.ReactNode; label: string }> = {
  email: { icon: <Mail className="w-3.5 h-3.5" />, label: 'Email' },
  whatsapp: { icon: <MessageCircle className="w-3.5 h-3.5" />, label: 'WhatsApp' },
  sms: { icon: <Smartphone className="w-3.5 h-3.5" />, label: 'SMS' },
  platform_chat: { icon: <Monitor className="w-3.5 h-3.5" />, label: 'Platform Chat' },
};

export default function AgentsPage() {
  const [agents, setAgents] = useState(mockAIAgents);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [editConfig, setEditConfig] = useState<AIAgent['config'] | null>(null);

  const toggleAgent = (id: string) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, is_active: !a.is_active } : a));
  };

  const openConfig = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setEditConfig({ ...agent.config });
  };

  const comparisonData = agents
    .filter(a => a.type !== 'analytics')
    .map(a => ({
      name: a.name,
      'Messages Sent': a.stats.messages_sent,
      'Responses': a.stats.responses_received,
      'Conversions': a.stats.conversions,
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display">AI Agents</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage and monitor your AI outreach agents</p>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => openConfig(agent)}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group"
          >
            {/* Agent Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  agent.is_active ? 'bg-primary/10' : 'bg-muted'
                )}>
                  <Bot className={cn('w-6 h-6', agent.is_active ? 'text-primary' : 'text-muted-foreground')} />
                </div>
                <div>
                  <h3 className="font-semibold text-base">{agent.name}</h3>
                  <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize', typeColors[agent.type])}>
                    {typeIcons[agent.type]}
                    {agent.type}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleAgent(agent.id); }}
                className={cn(
                  'relative w-10 h-5.5 rounded-full transition-colors',
                  agent.is_active ? 'bg-emerald-500' : 'bg-gray-300'
                )}
                style={{ width: '40px', height: '22px' }}
              >
                <span
                  className={cn(
                    'absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform',
                    agent.is_active ? 'translate-x-[20px]' : 'translate-x-0.5'
                  )}
                />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{agent.description}</p>

            {/* Stats */}
            {agent.type !== 'analytics' ? (
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <p className="text-lg font-bold">{agent.stats.messages_sent.toLocaleString()}</p>
                  <p className="text-[11px] text-muted-foreground">Sent</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <p className="text-lg font-bold">{agent.stats.engagement_rate}%</p>
                  <p className="text-[11px] text-muted-foreground">Engagement</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/30">
                  <p className="text-lg font-bold">{agent.stats.conversions}</p>
                  <p className="text-[11px] text-muted-foreground">Conversions</p>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-muted/30 text-center">
                <p className="text-sm text-muted-foreground">Background analytics agent — no direct messaging</p>
              </div>
            )}

            {/* Channels */}
            {agent.config.channels.length > 0 && (
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/50">
                {agent.config.channels.map(ch => (
                  <span key={ch} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">
                    {channelIcons[ch]?.icon}
                    {channelIcons[ch]?.label || ch}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Performance Comparison Chart */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-base font-semibold mb-4">Agent Performance Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
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
              <Bar dataKey="Messages Sent" fill="#D4A017" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Responses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Conversions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Config Dialog */}
      {selectedAgent && editConfig && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedAgent(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{selectedAgent.name}</h2>
                    <span className={cn('text-xs font-medium capitalize px-2 py-0.5 rounded-full', typeColors[selectedAgent.type])}>
                      {selectedAgent.type}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedAgent(null)} className="p-2 rounded-lg hover:bg-muted">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Greeting Template */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Greeting Template</label>
                  <textarea
                    value={editConfig.greeting_template}
                    onChange={(e) => setEditConfig({ ...editConfig, greeting_template: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Use {'{name}'}, {'{field}'} as placeholders</p>
                </div>

                {/* Tone */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Tone</label>
                  <select
                    value={editConfig.tone}
                    onChange={(e) => setEditConfig({ ...editConfig, tone: e.target.value as 'warm' | 'professional' | 'inspirational' })}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="warm">Warm</option>
                    <option value="professional">Professional</option>
                    <option value="inspirational">Inspirational</option>
                  </select>
                </div>

                {/* Channels */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Channels</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(channelIcons).map(([key, { icon, label }]) => {
                      const active = editConfig.channels.includes(key);
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setEditConfig({
                              ...editConfig,
                              channels: active
                                ? editConfig.channels.filter(c => c !== key)
                                : [...editConfig.channels, key],
                            });
                          }}
                          className={cn(
                            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors',
                            active ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:bg-muted'
                          )}
                        >
                          {icon} {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Start Time</label>
                    <input
                      type="time"
                      value={editConfig.working_hours.start}
                      onChange={(e) => setEditConfig({ ...editConfig, working_hours: { ...editConfig.working_hours, start: e.target.value } })}
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">End Time</label>
                    <input
                      type="time"
                      value={editConfig.working_hours.end}
                      onChange={(e) => setEditConfig({ ...editConfig, working_hours: { ...editConfig.working_hours, end: e.target.value } })}
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Follow-up Days */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Follow-up Days</label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={editConfig.followup_days}
                    onChange={(e) => setEditConfig({ ...editConfig, followup_days: parseInt(e.target.value) || 0 })}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Max Messages */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Max Messages Per Day</label>
                  <input
                    type="number"
                    min={0}
                    value={editConfig.max_messages_per_day}
                    onChange={(e) => setEditConfig({ ...editConfig, max_messages_per_day: parseInt(e.target.value) || 0 })}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 p-5 border-t border-border">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setAgents(prev => prev.map(a => a.id === selectedAgent.id ? { ...a, config: editConfig } : a));
                    setSelectedAgent(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
