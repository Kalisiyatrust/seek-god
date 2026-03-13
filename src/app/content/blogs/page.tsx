'use client';

import { useState, useMemo } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { mockContent } from '@/lib/mock-data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Clock, Eye, Heart, User, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const blogCategories = ['All', 'Purpose', 'Personal Growth', 'Mindfulness', 'Spirituality', 'Relationships', 'Mental Health', 'Career & Meaning', 'Community Impact', 'Science of Giving', 'Stories of Change'];

export default function BlogsPage() {
  const [category, setCategory] = useState('All');
  const [viewCount, setViewCount] = useState(0);
  const [showSignup, setShowSignup] = useState(false);

  const blogs = useMemo(() => {
    const items = mockContent.filter(c => c.type === 'blog');
    if (category === 'All') return items;
    return items.filter(b => b.category === category);
  }, [category]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Blog & Articles</h1>
            <p className="text-muted-foreground">Insights, stories, and guides to help you live with purpose</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <aside className="lg:w-56 flex-shrink-0">
              <h3 className="text-sm font-semibold mb-3">Categories</h3>
              <div className="flex lg:flex-col gap-2">
                {blogCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium text-left whitespace-nowrap transition-colors',
                      category === cat ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </aside>

            {/* Blog Cards */}
            <div className="flex-1 space-y-6">
              {blogs.map(blog => (
                <article
                  key={blog.id}
                  onClick={() => { const c = viewCount + 1; setViewCount(c); if (c >= 5) setShowSignup(true); }}
                  className="content-card group bg-card border border-border rounded-xl overflow-hidden cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    <div className="sm:w-56 h-40 sm:h-auto bg-gradient-to-br from-blue-50 to-warm-50 flex items-center justify-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow">
                        <span className="text-primary text-2xl font-display font-bold">{blog.title[0]}</span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs text-primary font-medium mb-1">{blog.category}</span>
                      <h2 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">{blog.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{blog.description}</p>
                      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                        {blog.author && (
                          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {blog.author}</span>
                        )}
                        <span>{formatDate(blog.created_at)}</span>
                        {blog.duration && (
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.duration}</span>
                        )}
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {blog.views.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {blog.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {blogs.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">No blog posts found in this category.</div>
              )}

              {/* Signup Banner */}
              <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary/10 via-gold-50 to-warm-50 border border-primary/20 p-8 text-center">
                <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-display font-bold mb-2">Unlock Your Full Journey</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">Sign up for free to get personalized recommendations, save your favorites, and access exclusive content.</p>
                <Link href="/signup" className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  Sign Up Free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
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
