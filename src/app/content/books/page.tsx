'use client';

import { useState, useMemo } from 'react';
import { mockContent } from '@/lib/mock-data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BookOpen, Eye, Heart, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function BooksPage() {
  const [viewCount, setViewCount] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const books = useMemo(() => mockContent.filter(c => c.type === 'book_summary'), []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Book Summaries</h1>
            <p className="text-muted-foreground">Key insights from transformative books, distilled for busy people</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <div key={book.id} onClick={() => { const c = viewCount + 1; setViewCount(c); if (c >= 5) setShowSignup(true); }} className="content-card group bg-card border border-border rounded-xl overflow-hidden flex flex-col cursor-pointer">
                {/* Cover placeholder */}
                <div className="relative h-56 bg-gradient-to-br from-emerald-50 via-gold-50 to-warm-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center mx-auto group-hover:scale-105 transition-transform border border-border">
                      <div className="text-center px-2">
                        <BookOpen className="w-6 h-6 text-primary mx-auto mb-1" />
                        <p className="text-[9px] font-display font-bold text-foreground leading-tight line-clamp-3">{book.title}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-primary font-medium mb-1">{book.category}</span>
                  <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-1.5">{book.title}</h3>
                  {book.author && <p className="text-xs text-muted-foreground mb-2">By {book.author}</p>}
                  <p className="text-xs text-muted-foreground line-clamp-3 flex-1">{book.description}</p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {book.views.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {book.likes.toLocaleString()}</span>
                    </div>
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-primary/10 text-primary hover:bg-primary/20">
                      Read Summary <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {books.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">No book summaries available yet.</div>
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
