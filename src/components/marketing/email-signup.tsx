'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Mail, CheckCircle, Loader2, ArrowRight } from 'lucide-react';

interface EmailSignupProps {
  variant?: 'inline' | 'banner' | 'popup' | 'minimal';
  heading?: string;
  subtext?: string;
  buttonText?: string;
  className?: string;
}

export function EmailSignup({
  variant = 'inline',
  heading,
  subtext,
  buttonText = 'Subscribe',
  className,
}: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: variant }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Subscription failed');
      setStatus('success');
      setEmail('');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('flex items-center gap-2 text-sm text-emerald-600', className)}>
        <CheckCircle className="h-5 w-5 shrink-0" />
        <span>Welcome aboard! Check your inbox for a confirmation.</span>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : buttonText}
        </button>
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn('', className)}>
        {heading && <h4 className="font-semibold text-sm mb-2">{heading}</h4>}
        {subtext && <p className="text-sm text-muted-foreground mb-3">{subtext}</p>}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : buttonText}
          </button>
        </form>
        {status === 'error' && <p className="text-xs text-red-500 mt-2">{errorMsg}</p>}
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={cn('relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-gold-50 to-warm-50 border border-primary/10', className)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="relative px-6 py-10 sm:px-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
            <Mail className="h-3.5 w-3.5" /> Free Weekly Newsletter
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            {heading || 'Get Weekly Purpose Insights'}
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            {subtext || 'Join thousands of purpose-driven individuals receiving actionable insights on meaning, faith, and fulfillment.'}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 mx-auto max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full rounded-full border border-input bg-background px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {buttonText || 'Subscribe'} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
          {status === 'error' && <p className="text-xs text-red-500 mt-3">{errorMsg}</p>}
          <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    );
  }

  // popup variant
  return (
    <div className={cn('text-center', className)}>
      <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">
        {heading || "Don't Miss Your Weekly Inspiration"}
      </h3>
      <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
        {subtext || 'Join 5,000+ seekers getting weekly insights on purpose, meaning, and impact.'}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xs mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="rounded-full border border-input bg-background px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : (buttonText || 'Get Weekly Insights')}
        </button>
      </form>
      {status === 'error' && <p className="text-xs text-red-500 mt-2">{errorMsg}</p>}
      <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
