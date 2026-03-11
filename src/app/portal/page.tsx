'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { mockContent, mockJourney, mockConversations } from '@/lib/mock-data';
import { DailyQuote } from '@/components/portal/daily-quote';
import { ContentCard } from '@/components/content/content-card';
import {
  MessageCircle,
  BookOpen,
  ClipboardCheck,
  Heart,
  Flame,
  Sparkles,
  ArrowRight,
  Bot,
} from 'lucide-react';

const phases = ['discovery', 'awareness', 'transformation', 'purpose', 'giving'] as const;

export default function PortalHome() {
  const journey = mockJourney;
  const currentPhaseIndex = phases.indexOf(journey.current_phase);
  const progress = ((currentPhaseIndex + 1) / phases.length) * 100;
  const completedMilestones = journey.milestones.filter(m => m.completed).length;
  const totalMilestones = journey.milestones.length;

  const recommended = mockContent.filter(c => !c.is_premium).slice(0, 3);
  const recentMessages = mockConversations[0]?.messages.slice(-2) || [];

  const quickActions = [
    { label: 'Start Chat', icon: MessageCircle, href: '/portal/chat', color: 'bg-blue-100 text-blue-700' },
    { label: 'Browse Library', icon: BookOpen, href: '/portal/library', color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Take Assessment', icon: ClipboardCheck, href: '/portal/journey', color: 'bg-purple-100 text-purple-700' },
    { label: 'Make a Donation', icon: Heart, href: '/portal', color: 'bg-gold-100 text-gold-700' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">Welcome back, James</h1>
            <p className="text-muted-foreground mt-1">Continue your journey of discovery and growth.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
            <Flame className="w-4 h-4" />
            7-day growth streak!
          </div>
        </div>
      </motion.div>

      {/* Daily Quote */}
      <DailyQuote />

      {/* Journey Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-lg">Your Journey</h2>
            <p className="text-sm text-muted-foreground">
              Phase: <span className="text-primary font-medium capitalize">{journey.current_phase}</span> &middot; {completedMilestones}/{totalMilestones} milestones
            </p>
          </div>
          <Link
            href="/portal/journey"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {/* Phase Progress */}
        <div className="flex items-center gap-1 mb-3">
          {phases.map((phase, i) => (
            <div key={phase} className="flex-1 flex items-center gap-1">
              <div className={`flex-1 h-2 rounded-full ${i <= currentPhaseIndex ? 'bg-primary' : 'bg-muted'}`} />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          {phases.map(p => (
            <span key={p} className="capitalize">{p}</span>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2.5 p-4 bg-card border border-border rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
              >
                <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Recommended Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Recommended for You
          </h2>
          <Link href="/portal/library" className="text-sm text-primary hover:underline flex items-center gap-1">
            See All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommended.map(item => (
            <ContentCard key={item.id} content={item} size="small" />
          ))}
        </div>
      </motion.div>

      {/* Recent Chat Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Recent Conversations</h2>
          <Link href="/portal/chat" className="text-sm text-primary hover:underline flex items-center gap-1">
            Open Chat <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentMessages.map(msg => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender_type === 'ai_agent' ? 'bg-primary/10' : 'bg-muted'
              }`}>
                {msg.sender_type === 'ai_agent'
                  ? <Bot className="w-4 h-4 text-primary" />
                  : <span className="text-xs font-bold text-muted-foreground">JR</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium mb-0.5">
                  {msg.sender_type === 'ai_agent' ? 'Grace (AI Agent)' : 'You'}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
