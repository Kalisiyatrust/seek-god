'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { mockContent } from '@/lib/mock-data';
import { ContentCard } from '@/components/content/content-card';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Bookmark, History } from 'lucide-react';

const tabs = [
  { id: 'recommended', label: 'Recommended', icon: ArrowRight },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'history', label: 'History', icon: History },
] as const;

// Simulated user data
const savedIds = ['1', '3', '4'];
const historyIds = ['1', '2', '5', '4'];
const readingProgress: Record<string, number> = {
  '1': 75,
  '5': 40,
  '4': 100,
};

export default function PortalLibrary() {
  const [activeTab, setActiveTab] = useState<'recommended' | 'saved' | 'history'>('recommended');

  const recommended = useMemo(() => mockContent.filter(c => !c.is_premium).slice(0, 6), []);
  const saved = useMemo(() => mockContent.filter(c => savedIds.includes(c.id)), []);
  const history = useMemo(() => {
    return historyIds.map(id => mockContent.find(c => c.id === id)).filter(Boolean) as typeof mockContent;
  }, []);

  const currentItems = activeTab === 'recommended' ? recommended : activeTab === 'saved' ? saved : history;

  // "Continue where you left off" — items with partial progress
  const continueItems = mockContent.filter(c => {
    const prog = readingProgress[c.id];
    return prog !== undefined && prog < 100;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold">My Library</h1>
        <p className="text-muted-foreground mt-1">Your personalized content collection</p>
      </div>

      {/* Continue Reading */}
      {continueItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Continue Where You Left Off
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {continueItems.map(item => (
              <div key={item.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xl font-display font-bold">{item.title[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.type === 'audio' ? 'Listening' : 'Reading'} &middot; {readingProgress[item.id]}% complete</p>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${readingProgress[item.id]}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {currentItems.map(item => (
          <ContentCard key={item.id} content={item} />
        ))}
      </motion.div>

      {currentItems.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-sm">
            {activeTab === 'saved' ? 'No saved items yet. Bookmark content to find it here.' : 'No history yet. Start exploring content!'}
          </p>
        </div>
      )}
    </div>
  );
}
