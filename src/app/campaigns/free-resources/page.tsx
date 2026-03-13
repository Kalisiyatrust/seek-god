'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { videoSummaries } from '@/lib/content/video-summaries';
import { blogArticles } from '@/lib/content/blog-articles';
import { audioGuides } from '@/lib/content/audio-guides';
import {
  Sparkles,
  ArrowRight,
  Video,
  BookOpen,
  Headphones,
  Target,
  Flame,
  MessageCircle,
  Eye,
  Heart,
  Clock,
  CheckCircle2,
  Mail,
  Gift,
} from 'lucide-react';

const videoPreview = videoSummaries.slice(0, 3);
const blogPreview = blogArticles.slice(0, 3);
const audioPreview = audioGuides.slice(0, 3);

const categories = [
  {
    id: 'videos',
    title: 'Video Summaries',
    count: videoSummaries.length,
    icon: Video,
    href: '/content/videos',
    description: 'Concise summaries of the most impactful talks on purpose, growth, and meaning.',
    color: 'from-red-500/10 to-orange-500/10',
    iconColor: 'text-red-500',
    items: videoPreview,
  },
  {
    id: 'blogs',
    title: 'Blog Articles',
    count: blogArticles.length,
    icon: BookOpen,
    href: '/content/blogs',
    description: 'Deep-dive articles on psychology, philosophy, and the science of a meaningful life.',
    color: 'from-blue-500/10 to-cyan-500/10',
    iconColor: 'text-blue-500',
    items: blogPreview,
  },
  {
    id: 'audio',
    title: 'Audio Guides',
    count: audioGuides.length,
    icon: Headphones,
    href: '/content/audio',
    description: 'Guided meditations, reflections, and practices you can listen to anywhere.',
    color: 'from-purple-500/10 to-violet-500/10',
    iconColor: 'text-purple-500',
    items: audioPreview,
  },
];

const tools = [
  {
    title: 'Purpose Discovery Quiz',
    description: 'Discover your unique purpose archetype with our free 5-minute assessment based on positive psychology research.',
    icon: Target,
    href: '/campaigns/purpose-quiz',
    cta: 'Take the Quiz',
    color: 'from-gold-500/10 to-warm-500/10',
    iconColor: 'text-primary',
  },
  {
    title: '7-Day Meditation Challenge',
    description: 'A free guided journey through 7 meditation styles to help you build a lasting practice of inner peace.',
    icon: Flame,
    href: '/campaigns/meditation-challenge',
    cta: 'Start the Challenge',
    color: 'from-emerald-500/10 to-teal-500/10',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'AI Chat Guide',
    description: 'Get personalized spiritual guidance from our AI companion, trained on wisdom traditions and modern psychology.',
    icon: MessageCircle,
    href: '/portal/chat',
    cta: 'Try the Chat',
    badge: 'Premium Preview',
    color: 'from-amber-500/10 to-yellow-500/10',
    iconColor: 'text-amber-600',
  },
];

export default function FreeResourcesPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const totalContent = videoSummaries.length + blogArticles.length + audioGuides.length;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-50 via-warm-50/50 to-background" />
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-gold-200/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Gift className="w-4 h-4" />
            100% Free — No Login Required
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            Your Free Toolkit for a{' '}
            <span className="gradient-text">Purposeful Life</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {totalContent}+ pieces of content, guided practices, and interactive tools — all free, all designed to help you live with deeper meaning and intention.
          </p>

          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full bg-background border border-border shadow-sm">
            <div className="flex items-center gap-2 text-sm">
              <Video className="w-4 h-4 text-primary" />
              <span className="font-medium">{videoSummaries.length} Videos</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-medium">{blogArticles.length} Articles</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <Headphones className="w-4 h-4 text-primary" />
              <span className="font-medium">{audioGuides.length} Audio</span>
            </div>
          </div>
        </div>
      </section>

      {/* Free Banner */}
      <section className="py-6 px-4 bg-primary/5 border-y border-primary/10">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-center">
          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-sm sm:text-base font-medium text-foreground">
            Everything is free. No login required. No credit card. Just start exploring.
          </p>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Explore Our Library
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hundreds of resources across video, written, and audio formats — something for every learning style.
            </p>
          </div>

          <div className="space-y-16">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <div key={cat.id}>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                        <CatIcon className={`w-5 h-5 ${cat.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-foreground">{cat.title}</h3>
                        <p className="text-sm text-muted-foreground">{cat.count} resources available</p>
                      </div>
                    </div>
                    <a
                      href={cat.href}
                      className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      View all
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-muted-foreground mb-6">{cat.description}</p>

                  {/* Preview Cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.items.map((item) => (
                      <a
                        key={item.id}
                        href={cat.href}
                        className="group p-5 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                          {item.is_featured && (
                            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                              <Sparkles className="w-3 h-3" /> Featured
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {item.likes.toLocaleString()}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>

                  <a
                    href={cat.href}
                    className="sm:hidden flex items-center justify-center gap-1 mt-4 text-sm font-medium text-primary"
                  >
                    View all {cat.count} {cat.title.toLowerCase()}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Interactive Tools & Experiences
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Go beyond reading — engage with interactive assessments, challenges, and AI-powered guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="group relative p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  {tool.badge && (
                    <span className="absolute top-4 right-4 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {tool.badge}
                    </span>
                  )}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-5`}>
                    <ToolIcon className={`w-7 h-7 ${tool.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {tool.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Email CTA */}
      <section className="py-20 px-4">
        <div className="max-w-lg mx-auto text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-gold-50 to-warm-50 border border-primary/20">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-6">
            We add new free content every week. Get notified when fresh resources are published.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            {!submitted ? (
              <>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all"
                >
                  Subscribe
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 justify-center w-full text-primary font-medium">
                <CheckCircle2 className="w-5 h-5" />
                You&apos;re subscribed! Welcome aboard.
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
