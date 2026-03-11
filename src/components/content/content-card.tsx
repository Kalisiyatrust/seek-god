'use client';

import { cn } from '@/lib/utils';
import { ContentItem } from '@/types';
import { Play, Headphones, BookOpen, FileText, Quote, Lock, Eye, Heart } from 'lucide-react';
import Link from 'next/link';

const typeConfig: Record<string, { icon: React.ReactNode; color: string; label: string; route: string }> = {
  video_summary: { icon: <Play className="w-4 h-4" />, color: 'bg-red-100 text-red-700', label: 'Video', route: '/content/videos' },
  audio: { icon: <Headphones className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700', label: 'Audio', route: '/content/audio' },
  blog: { icon: <FileText className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700', label: 'Blog', route: '/content/blogs' },
  book_summary: { icon: <BookOpen className="w-4 h-4" />, color: 'bg-emerald-100 text-emerald-700', label: 'Book', route: '/content/books' },
  quote: { icon: <Quote className="w-4 h-4" />, color: 'bg-gold-100 text-gold-700', label: 'Quote', route: '/content' },
};

interface ContentCardProps {
  content: ContentItem;
  size?: 'small' | 'medium' | 'large';
  showPremiumLock?: boolean;
}

export function ContentCard({ content, size = 'medium', showPremiumLock = true }: ContentCardProps) {
  const config = typeConfig[content.type] || typeConfig.blog;

  if (size === 'large') {
    return (
      <div className="content-card group bg-card border border-border rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Thumbnail area */}
          <div className="relative h-48 md:h-full min-h-[240px] bg-gradient-to-br from-primary/10 to-warm-100 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-white/80 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <div className="text-primary scale-150">{config.icon}</div>
            </div>
            {content.is_premium && showPremiumLock && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500 text-white text-xs font-medium">
                <Lock className="w-3 h-3" /> Premium
              </div>
            )}
            {content.is_featured && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Featured
              </div>
            )}
          </div>
          {/* Content */}
          <div className="p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', config.color)}>
                {config.icon} {config.label}
              </span>
              <span className="text-xs text-muted-foreground">{content.category}</span>
            </div>
            <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{content.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{content.description}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                {content.author && <span>By {content.author}</span>}
                {content.duration && <span>{content.duration}</span>}
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {content.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {content.likes.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'content-card group bg-card border border-border rounded-xl overflow-hidden flex flex-col',
      size === 'small' && 'rounded-lg'
    )}>
      {/* Thumbnail */}
      <div className={cn(
        'relative bg-gradient-to-br from-primary/5 to-warm-50 flex items-center justify-center',
        size === 'small' ? 'h-28' : 'h-40'
      )}>
        <div className={cn(
          'rounded-xl bg-white/80 backdrop-blur flex items-center justify-center shadow group-hover:scale-110 transition-transform',
          size === 'small' ? 'w-10 h-10' : 'w-14 h-14'
        )}>
          <div className={cn('text-primary', size === 'small' ? '' : 'scale-125')}>{config.icon}</div>
        </div>
        {content.is_premium && showPremiumLock && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500 text-white text-[10px] font-medium">
            <Lock className="w-2.5 h-2.5" /> Premium
          </div>
        )}
        {content.type === 'video_summary' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
              <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className={cn('flex flex-col flex-1', size === 'small' ? 'p-3' : 'p-4')}>
        <div className="flex items-center gap-2 mb-2">
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium', config.color)}>
            {config.label}
          </span>
          <span className="text-[10px] text-muted-foreground">{content.category}</span>
        </div>
        <h3 className={cn(
          'font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-1.5',
          size === 'small' ? 'text-sm' : 'text-base'
        )}>
          {content.title}
        </h3>
        {size !== 'small' && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{content.description}</p>
        )}
        <div className={cn('flex items-center justify-between text-muted-foreground mt-auto', size === 'small' ? 'text-[10px]' : 'text-xs')}>
          <span>{content.duration}</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {content.views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
