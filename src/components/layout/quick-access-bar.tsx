'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TrendingUp, BookOpen, Headphones, FileText, Play, MessageCircle, Compass } from 'lucide-react';

const shortcuts = [
  { href: '/content', label: 'Trending', icon: TrendingUp },
  { href: '/content/books', label: 'Books', icon: BookOpen },
  { href: '/content/audio', label: 'Audio', icon: Headphones },
  { href: '/content/blogs', label: 'Blogs', icon: FileText },
  { href: '/content/videos', label: 'Videos', icon: Play },
  { href: '/portal/chat', label: 'Chat', icon: MessageCircle },
  { href: '/portal/journey', label: 'My Journey', icon: Compass },
];

export function QuickAccessBar() {
  const pathname = usePathname();

  // Only show on public pages, not on dashboard or portal
  if (pathname.startsWith('/dashboard')) return null;

  const isActive = (href: string) => pathname === href;

  return (
    <div className="md:hidden overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 px-4 py-2.5 min-w-max">
        {shortcuts.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border',
                active
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/20'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
