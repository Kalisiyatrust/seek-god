'use client';

import { motion } from 'framer-motion';
import { Heart, Target, Users, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
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

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* ========== HERO ========== */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-50 via-warm-50 to-background dark:from-gold-900/20 dark:via-warm-900/10 dark:to-background" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              About Seek God
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              Our <span className="gradient-text">Mission</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              We exist to help people look beyond material success and discover
              the deeper purpose their lives were created for.
            </motion.p>
          </div>
        </section>

        {/* ========== STORY ========== */}
        <Section className="py-20 px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold mb-6 text-center">
              How It Started
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Seek God was born from a simple observation: many of the most
                outwardly successful people in the world are privately searching
                for something more. They&apos;ve achieved wealth, status, and
                recognition — yet a quiet voice inside keeps asking,{' '}
                <em>&ldquo;Is this all there is?&rdquo;</em>
              </p>
              <p>
                Our founder experienced this first-hand. After years of chasing
                professional milestones, a moment of stillness revealed that the
                ladder of success was leaning against the wrong wall. The real
                question wasn&apos;t <em>&ldquo;How do I achieve more?&rdquo;</em>{' '}
                but <em>&ldquo;Who am I meant to become, and who am I meant to
                serve?&rdquo;</em>
              </p>
              <p>
                That question became the foundation of Seek God — a platform that
                combines cutting-edge AI technology with timeless spiritual
                wisdom to guide high-achievers toward a life of authentic purpose,
                generosity, and lasting impact.
              </p>
            </div>
          </div>
        </Section>

        {/* ========== VALUES ========== */}
        <Section className="py-20 px-4 gradient-bg">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl font-bold mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Faith',
                  desc: 'We believe there is a higher purpose behind every life. Faith is the compass that guides us toward it.',
                },
                {
                  icon: Target,
                  title: 'Purpose',
                  desc: 'Everyone has a unique calling. We help you uncover yours and align your daily life around it.',
                },
                {
                  icon: Users,
                  title: 'Community',
                  desc: 'Transformation is deeper when shared. We build genuine connections between seekers on the same path.',
                },
                {
                  icon: Lightbulb,
                  title: 'Impact',
                  desc: 'Purpose without action is incomplete. We inspire and equip you to change lives with what you have.',
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
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

        {/* ========== FOUNDER ========== */}
        <Section className="py-20 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold mb-8">
              Meet the Founder
            </h2>
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary mb-6">
              SG
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              Seek God Team
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Founder &amp; Visionary
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Driven by a personal transformation from chasing worldly success to
              pursuing divine purpose, our founder built Seek God to make that
              same life-changing journey accessible to everyone — regardless of
              background, faith tradition, or where they are in life.
            </p>
          </div>
        </Section>

        {/* ========== CTA ========== */}
        <Section className="py-20 px-4 gradient-bg">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold mb-4">
              Begin Your Journey Today
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you&apos;re just starting to ask the big questions or
              you&apos;re ready to make an impact — there&apos;s a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
              >
                Join Seek God
              </Link>
              <Link
                href="/content"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Explore Content <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
