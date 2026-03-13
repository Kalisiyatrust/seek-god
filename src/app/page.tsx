'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Users,
  HandHeart,
  Play,
  FileText,
  BookMarked,
  ArrowRight,
  Search,
  Eye,
  Lightbulb,
  Target,
  Heart,
  Globe,
  DollarSign,
  Clock,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { mockContent } from '@/lib/mock-data';

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return { count, ref };
}

/* ------------------------------------------------------------------ */
/*  Section wrapper with fade-in                                       */
/* ------------------------------------------------------------------ */
function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Content type icon helper                                           */
/* ------------------------------------------------------------------ */
function ContentIcon({ type }: { type: string }) {
  switch (type) {
    case 'video_summary':
      return <Play className="h-4 w-4" />;
    case 'blog':
      return <FileText className="h-4 w-4" />;
    case 'book_summary':
      return <BookMarked className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function LandingPage() {
  const featuredContent = mockContent.filter((c) => c.is_featured).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* ========== HERO ========== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Warm gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-50 via-warm-50 to-background dark:from-gold-900/20 dark:via-warm-900/10 dark:to-background" />

          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-[15%] w-20 h-20 rounded-full bg-primary/10 blur-xl"
            />
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/3 right-[20%] w-32 h-32 rounded-full bg-accent/10 blur-xl"
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-1/3 left-[60%] w-16 h-16 rounded-full bg-gold-400/15 blur-lg"
            />
            {/* Small star-like dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                className="absolute w-2 h-2 rounded-full bg-primary/30"
                style={{
                  top: `${20 + i * 12}%`,
                  left: `${10 + i * 15}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block mb-6 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Your Journey Starts Here
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
            >
              Discover Your{' '}
              <span className="gradient-text">True Purpose</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10"
            >
              Success alone doesn&apos;t bring fulfillment. Find the deeper meaning
              behind your achievements and learn how to channel them into
              changing lives — starting with your own.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/signup"
                className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
              >
                Start Your Journey
              </Link>
              <Link
                href="/content"
                className="rounded-full border-2 border-primary/30 px-8 py-3.5 text-base font-semibold text-foreground hover:bg-primary/5 transition-colors"
              >
                Explore Content
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ========== MISSION ========== */}
        <Section className="py-20 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              We believe every life has a{' '}
              <span className="gradient-text">divine purpose</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Seek God connects successful individuals with a deeper sense of
              meaning. We help you look beyond material accomplishments, discover
              the purpose you were created for, and inspire you to use your
              influence and resources to uplift others.
            </p>
          </div>
        </Section>

        {/* ========== FEATURES GRID ========== */}
        <Section className="py-20 px-4 gradient-bg">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                How We Guide You
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Purpose-built tools and community to support every step of your journey.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: 'AI-Powered Guidance',
                  desc: 'Personal AI companions that understand your journey and provide wisdom tailored to where you are right now.',
                },
                {
                  icon: BookOpen,
                  title: 'Transformative Content',
                  desc: 'Curated videos, book summaries, and meditations designed to shift your perspective on success and purpose.',
                },
                {
                  icon: Users,
                  title: 'Community of Purpose',
                  desc: 'Connect with like-minded seekers who are on the same path toward meaningful, purpose-driven living.',
                },
                {
                  icon: HandHeart,
                  title: 'Make an Impact',
                  desc: 'Channel your success, resources, and influence into initiatives that change lives across the world.',
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="content-card rounded-xl border border-border bg-card p-6"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ========== CONTENT PREVIEW ========== */}
        <Section className="py-20 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Featured Content
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Explore powerful ideas that will reshape how you see success, purpose, and giving.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredContent.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="content-card rounded-xl border border-border bg-card overflow-hidden group"
                >
                  {/* Thumbnail placeholder */}
                  <div className="relative h-44 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <ContentIcon type={item.type} />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 text-xs font-medium">
                      <ContentIcon type={item.type} />
                      {item.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-primary">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold mt-1 mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.duration}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/content"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View all content <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Section>

        {/* ========== TESTIMONIALS ========== */}
        <Section className="py-20 px-4 gradient-bg">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Lives Transformed
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Hear from people who discovered that true success goes far beyond the material.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'James Robertson',
                  role: 'CEO, Tech Firm',
                  initials: 'JR',
                  quote:
                    'I spent 20 years climbing the corporate ladder only to realise I was leaning it against the wrong wall. Seek God helped me find a purpose that makes every morning worth waking up for.',
                },
                {
                  name: 'Sarah Mitchell',
                  role: 'Fund Manager',
                  initials: 'SM',
                  quote:
                    'The AI-guided conversations helped me see that my financial skills could do so much more than grow portfolios. Now I help fund community projects and it fills my soul.',
                },
                {
                  name: 'Priya Patel',
                  role: 'Consultant Doctor',
                  initials: 'PP',
                  quote:
                    'As a doctor I healed bodies, but I was neglecting my own spirit. This platform gave me the tools and community to reconnect with why I chose medicine in the first place.',
                },
              ].map(({ name, role, initials, quote }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ========== JOURNEY STEPS ========== */}
        <Section className="py-20 px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Your Path to Purpose
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A proven journey from seeking to serving.
              </p>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-px" />

              {[
                {
                  icon: Search,
                  step: 'Discovery',
                  desc: 'You sense there is something more. You begin asking the questions that matter.',
                },
                {
                  icon: Eye,
                  step: 'Awareness',
                  desc: 'Through content and conversations, you start to see the bigger picture of your life.',
                },
                {
                  icon: Lightbulb,
                  step: 'Transformation',
                  desc: 'Old mindsets shift. You redefine what success truly means to you.',
                },
                {
                  icon: Target,
                  step: 'Purpose',
                  desc: 'You discover the unique contribution only you can make to the world.',
                },
                {
                  icon: Heart,
                  step: 'Giving',
                  desc: 'You channel your resources, skills, and influence into uplifting others.',
                },
              ].map(({ icon: Icon, step, desc }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-4 mb-10 last:mb-0 sm:w-1/2 ${
                    i % 2 === 0 ? 'sm:pr-10 sm:ml-0' : 'sm:pl-10 sm:ml-auto'
                  }`}
                >
                  {/* Dot on line */}
                  <div
                    className={`absolute top-1 z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card ${
                      i % 2 === 0
                        ? 'left-0 sm:left-auto sm:-right-6'
                        : 'left-0 sm:-left-6'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="pl-16 sm:pl-0">
                    <h3 className="font-display text-lg font-semibold mb-1">{step}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ========== STATS BAR ========== */}
        <Section className="py-16 px-4 gradient-bg">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { end: 2800, suffix: '+', label: 'Lives Touched', icon: Users },
                { end: 156, suffix: '', label: 'Hours of Content', icon: Clock },
                { end: 45, suffix: '', label: 'Countries Reached', icon: Globe },
                { end: 45200, prefix: '\u00A3', suffix: '', label: 'Donated', icon: DollarSign },
              ].map(({ end, suffix, prefix, label, icon: Icon }) => {
                const { count, ref } = useCounter(end);
                return (
                  <div key={label} ref={ref}>
                    <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                      {prefix}
                      {count.toLocaleString()}
                      {suffix}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* ========== CTA ========== */}
        <Section className="py-16 sm:py-20 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Ready to Begin?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join 2,800+ people who have discovered their purpose and are
              making a lasting impact in the world.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-center gap-3 mx-auto max-w-md"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-input bg-background px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Join Free
              </button>
            </form>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
