'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/landing/theme-toggle';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/content', label: 'Content' },
    { href: '/about', label: 'About' },
    { href: '/portal/chat', label: 'Chat' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Compass circle */}
              <circle cx="16" cy="16" r="14" />
              {/* Cross */}
              <line x1="16" y1="4" x2="16" y2="28" />
              <line x1="4" y1="16" x2="28" y2="16" />
              {/* Compass points */}
              <polygon points="16,6 18,14 16,12 14,14" fill="currentColor" stroke="none" />
              <polygon points="16,26 14,18 16,20 18,18" fill="currentColor" stroke="none" opacity="0.5" />
              <polygon points="6,16 14,14 12,16 14,18" fill="currentColor" stroke="none" opacity="0.5" />
              <polygon points="26,16 18,18 20,16 18,14" fill="currentColor" stroke="none" opacity="0.5" />
            </svg>
            <span className="text-xl font-display font-bold gradient-text">
              Seek God
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground text-center hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
