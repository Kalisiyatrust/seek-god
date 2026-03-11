'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { mockContent } from '@/lib/mock-data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ContentCard } from '@/components/content/content-card';
import { Search, SlidersHorizontal } from 'lucide-react';

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
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
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
              <ContentCard key={item.id} content={item} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No content found matching your search.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
