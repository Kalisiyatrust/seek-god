'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { mockContent } from '@/lib/mock-data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Play, Pause, Headphones, Clock, Eye, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const audioCategories = ['All', 'Morning Meditation', 'Evening Reflection', 'Guided Visualization', 'Breathing Exercise', 'Gratitude Practice', 'Stress Relief', 'Sleep Meditation', 'Purpose Talk', 'Motivational Talk', 'Mindful Walking'];

export default function AudioPage() {
  const [category, setCategory] = useState('All');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState(0);
  const [showSignup, setShowSignup] = useState(false);

  const audioItems = useMemo(() => {
    const items = mockContent.filter(c => c.type === 'audio');
    if (category === 'All') return items;
    return items.filter(a => a.category === category);
  }, [category]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Audio Library</h1>
            <p className="text-muted-foreground">Meditations, podcasts, and guided talks for your journey</p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
            {audioCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  category === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Audio List */}
          <div className="space-y-3">
            {audioItems.map(item => {
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-center gap-4 p-4 bg-card border border-border rounded-xl transition-all hover:shadow-md',
                    isPlaying && 'border-primary/30 bg-primary/5'
                  )}
                >
                  {/* Play Button */}
                  <button
                    onClick={() => { setPlayingId(isPlaying ? null : item.id); const c = viewCount + 1; setViewCount(c); if (c >= 5) setShowSignup(true); }}
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors',
                      isPlaying ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'
                    )}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    {/* Waveform placeholder */}
                    <div className="flex items-center gap-0.5 mt-2 h-6">
                      {Array.from({ length: 40 }).map((_, i) => {
                        const height = Math.random() * 100;
                        return (
                          <div
                            key={i}
                            className={cn(
                              'w-1 rounded-full transition-colors',
                              isPlaying && i < 15 ? 'bg-primary' : 'bg-muted-foreground/20'
                            )}
                            style={{ height: `${Math.max(15, height)}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.views.toLocaleString()}</span>
                    <span className="text-primary text-[10px] font-medium">{item.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {audioItems.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">No audio content found in this category.</div>
          )}

          {/* Signup Banner */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-primary/10 via-gold-50 to-warm-50 border border-primary/20 p-8 text-center">
            <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-display font-bold mb-2">Unlock Your Full Journey</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">Sign up for free to get personalized recommendations, save your favorites, and access exclusive content.</p>
            <Link href="/signup" className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Sign Up Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      {/* Signup Modal after 5 views */}
      {showSignup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowSignup(false)}>
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold mb-2">You&apos;re Enjoying the Content!</h3>
            <p className="text-sm text-muted-foreground mb-6">Create a free account to continue exploring, save your progress, and unlock personalized AI guidance.</p>
            <Link href="/signup" className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Sign Up Free <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={() => setShowSignup(false)} className="block mx-auto mt-3 text-sm text-muted-foreground hover:text-foreground">
              Maybe later
            </button>
          </div>
        </div>
      )}
    </>
  );
}
