'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  MessageCircle,
  User,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

const portalLinks = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/journey', label: 'My Journey', icon: Map },
  { href: '/portal/library', label: 'Library', icon: BookOpen },
  { href: '/portal/chat', label: 'Chat', icon: MessageCircle },
  { href: '/portal/profile', label: 'Profile', icon: User },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/portal') return pathname === '/portal';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/portal" className="flex items-center gap-2">
              <svg viewBox="0 0 32 32" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="16" cy="16" r="14" />
                <line x1="16" y1="4" x2="16" y2="28" />
                <line x1="4" y1="16" x2="28" y2="16" />
                <polygon points="16,6 18,14 16,12 14,14" fill="currentColor" stroke="none" />
              </svg>
              <span className="text-xl font-display font-bold gradient-text">Seek God</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {portalLinks.map(link => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: User + Mobile menu */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">JR</span>
                </div>
                <span className="text-sm font-medium">James</span>
              </div>
              <Link
                href="/"
                className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-3 space-y-1">
              {portalLinks.map(link => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border mt-2">
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  <LogOut className="w-4 h-4" /> Sign Out
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
