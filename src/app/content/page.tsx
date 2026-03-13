'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { mockContent } from '@/lib/mock-data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ContentCard } from '@/components/content/content-card';
import { Search, SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'video_summary', label: 'Videos' },
  { value: 'audio', label: 'Audio' },
  { value: 'blog', label: 'Blogs' },
  { value: 'book_summary', label: 'Books' },
  { value: 'quote', label: 'Quotes' },
];

export default function ContentPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewCount, setViewCount] = useState(0);
  const [showSignup, setShowSignup] = useState(false);

  const featured = mockContent.filter(c => c.is_featured);

  const filtered = useMemo(() => {
    return mockContent.filter(item => {
      const matchesSearch = !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-warm-50 via-gold-50/50 to-background py-16 sm:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-10 right-20 w-64 h-64 bg-gold-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-warm-200/20 rounded-full blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              Explore Our <span className="gradient-text">Library</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Curated content to help you discover your purpose, grow spiritually, and live with intention.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search videos, articles, books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full border border-border bg-card shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Content */}
          {activeCategory === 'all' && !search && featured.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-semibold mb-4">Featured</h2>
              <ContentCard content={featured[0]} size="large" />
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div key={item.id} onClick={() => { const c = viewCount + 1; setViewCount(c); if (c >= 5) setShowSignup(true); }}>
                <ContentCard content={item} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No content found matching your search.</p>
            </div>
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
