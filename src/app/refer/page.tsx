'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ReferralWidget } from '@/components/marketing/referral-widget';
import { Users, Globe, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Users, value: '1,247', label: 'People referred this month' },
  { icon: Globe, value: '23', label: 'Countries reached' },
  { icon: Heart, value: '89%', label: 'Found it meaningful' },
  { icon: TrendingUp, value: '3.2x', label: 'More likely to stay' },
];

export default function ReferPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-50 via-warm-50 to-background" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Invite Friends
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight mb-4">
                Share the <span className="gradient-text">Journey</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Know someone searching for deeper meaning? Share Seek God and help them
                discover their true purpose. Every referral plants a seed of transformation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Referral Widget */}
        <section className="px-4 pb-16 -mt-4">
          <div className="mx-auto max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ReferralWidget />
            </motion.div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 px-4 gradient-bg">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">
              Your Impact So Far
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-2xl sm:text-3xl font-bold">{value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-10">
              How Referrals Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Share Your Link', desc: 'Copy your unique referral link or share directly to social media.' },
                { step: '2', title: 'Friends Explore', desc: 'They discover transformative content on purpose, meaning, and faith.' },
                { step: '3', title: 'Lives Change', desc: 'Every person who finds their purpose creates ripples of positive change.' },
              ].map(({ step, title, desc }) => (
                <div key={step}>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold mb-3">
                    {step}
                  </div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
