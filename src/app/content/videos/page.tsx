'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { mockContent } from '@/lib/mock-data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Play, Eye, Heart, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const videoCategories = ['All', 'Purpose', 'Faith', 'Leadership', 'Generosity', 'Mindset', 'Resilience', 'Success', 'Wellbeing', 'Legacy', 'Relationships'];

export default function VideosPage() {
  const [category, setCategory] = useState('All');
  const [viewCount, setViewCount] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const videos = useMemo(() => {
    const vids = mockContent.filter(c => c.type === 'video_summary');
    if (category === 'All') return vids;
    return vids.filter(v => v.category === category);
  }, [category]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Video Summaries</h1>
            <p className="text-muted-foreground">Key insights from powerful talks and presentations</p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
            {videoCategories.map(cat => (
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <div key={video.id} onClick={() => { const c = viewCount + 1; setViewCount(c); if (c >= 5) setShowSignup(true); }} className="content-card group bg-card border border-border rounded-xl overflow-hidden cursor-pointer">
                {/* Thumbnail */}
                <div className="relative h-44 bg-gradient-to-br from-red-50 to-warm-50 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all">
                    <Play className="w-7 h-7 text-white ml-0.5" fill="white" />
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs">
                      <Clock className="w-3 h-3" /> {video.duration}
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-4">
                  <span className="text-xs text-primary font-medium">{video.category}</span>
                  <h3 className="text-base font-semibold mt-1 group-hover:text-primary transition-colors line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">{video.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {video.views.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {video.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {videos.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">No videos found in this category.</div>
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
