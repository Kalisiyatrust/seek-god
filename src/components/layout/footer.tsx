import Link from 'next/link';
import { Heart, Youtube, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg
                viewBox="0 0 32 32"
                className="h-7 w-7 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="16" cy="16" r="14" />
                <line x1="16" y1="4" x2="16" y2="28" />
                <line x1="4" y1="16" x2="28" y2="16" />
                <polygon points="16,6 18,14 16,12 14,14" fill="currentColor" stroke="none" />
              </svg>
              <span className="text-lg font-display font-bold gradient-text">
                Seek God
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Helping people discover their true life purpose and channel
              their success into making a lasting impact.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: '/content', label: 'Content Library' },
                { href: '/about', label: 'About' },
                { href: '/portal/chat', label: 'Chat' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get weekly insights on living with purpose.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Join
              </button>
            </form>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              {[
                { icon: Youtube, label: 'YouTube' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            &copy; 2026 Seek God. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Created with{' '}
            <Heart className="h-3.5 w-3.5 text-primary inline" />{' '}
            <a
              href="https://perplexity.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              Perplexity Computer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
