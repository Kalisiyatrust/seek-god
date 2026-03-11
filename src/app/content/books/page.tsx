'use client';

import { useMemo } from 'react';
import { mockContent } from '@/lib/mock-data';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BookOpen, Lock, Eye, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BooksPage() {
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
              <div key={book.id} className="content-card group bg-card border border-border rounded-xl overflow-hidden flex flex-col cursor-pointer">
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
                  {book.is_premium && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500 text-white text-xs font-medium">
                      <Lock className="w-3 h-3" /> Premium
                    </div>
                  )}
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
                    <button className={cn(
                      'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                      book.is_premium
                        ? 'bg-gold-100 text-gold-700 hover:bg-gold-200'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    )}>
                      {book.is_premium ? <><Lock className="w-3 h-3" /> Unlock</> : <>Read Summary <ArrowRight className="w-3 h-3" /></>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {books.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">No book summaries available yet.</div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
