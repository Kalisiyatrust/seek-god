'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { EmailSignup } from './email-signup';

export function EmailPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show after 30 seconds
    const timer = setTimeout(() => {
      if (!dismissed) setShow(true);
    }, 30000);

    // Show on 60% scroll
    function handleScroll() {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.6 && !dismissed) {
        setShow(true);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dismissed]);

  function dismiss() {
    setShow(false);
    setDismissed(true);
  }

  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={dismiss} />
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-card via-card to-gold-50 border border-border shadow-2xl overflow-hidden">
        {/* Decorative gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-gold-500 to-primary" />
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-8 pt-6">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
          </div>
          <EmailSignup
            variant="popup"
            heading="Don't Miss Your Weekly Inspiration"
            subtext="Join 5,000+ seekers getting weekly insights on purpose, meaning, and impact."
            buttonText="Get Weekly Insights"
          />
        </div>
      </div>
    </div>
  );
}
