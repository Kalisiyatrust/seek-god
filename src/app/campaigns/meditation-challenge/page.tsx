'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  Sparkles,
  ArrowRight,
  Mail,
  Clock,
  Heart,
  Brain,
  Sun,
  Wind,
  Eye,
  Flame,
  Sunrise,
  ChevronDown,
  ChevronUp,
  Star,
  Quote,
  CheckCircle2,
} from 'lucide-react';

const days = [
  {
    day: 1,
    title: 'Morning Centering',
    duration: '10 min',
    icon: Sun,
    description:
      'Begin your journey by learning to anchor yourself in the present moment. This foundational practice teaches a simple breath-based technique you can use anytime to return to stillness.',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    day: 2,
    title: 'Breath Awareness',
    duration: '12 min',
    icon: Wind,
    description:
      'Deepen your relationship with your breath — the bridge between body and mind. Discover how conscious breathing can transform your emotional state in minutes.',
    color: 'from-sky-500/20 to-blue-500/20',
  },
  {
    day: 3,
    title: 'Gratitude Meditation',
    duration: '10 min',
    icon: Heart,
    description:
      'Research shows gratitude practices literally rewire your brain for positivity. This guided meditation helps you cultivate a heart of thankfulness that carries through your day.',
    color: 'from-rose-500/20 to-pink-500/20',
  },
  {
    day: 4,
    title: 'Body Scan & Release',
    duration: '15 min',
    icon: Eye,
    description:
      'Learn to listen to your body\'s wisdom. This practice guides you through a systematic release of held tension, leaving you feeling lighter and more alive.',
    color: 'from-emerald-500/20 to-green-500/20',
  },
  {
    day: 5,
    title: 'Purpose Visualization',
    duration: '12 min',
    icon: Flame,
    description:
      'Connect with your deepest sense of purpose through guided imagery. Visualize the life you\'re called to live and feel the alignment between your values and your daily choices.',
    color: 'from-violet-500/20 to-purple-500/20',
  },
  {
    day: 6,
    title: 'Loving-Kindness Practice',
    duration: '10 min',
    icon: Sparkles,
    description:
      'Extend compassion to yourself and others through the ancient practice of metta meditation. This practice has been shown to increase empathy, reduce anxiety, and deepen connection.',
    color: 'from-gold-500/20 to-warm-500/20',
  },
  {
    day: 7,
    title: 'Integration & Intention',
    duration: '15 min',
    icon: Sunrise,
    description:
      'Bring together everything you\'ve learned into a complete practice. Set meaningful intentions for the weeks ahead and create a personal meditation rhythm that fits your life.',
    color: 'from-primary/20 to-gold-400/20',
  },
];

const benefits = [
  { stat: '92%', label: 'report reduced stress', icon: Brain },
  { stat: '78%', label: 'feel greater clarity', icon: Eye },
  { stat: '85%', label: 'sleep more soundly', icon: Sun },
  { stat: '71%', label: 'continue meditating after', icon: Heart },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Marketing Director',
    text: 'I\'ve tried meditation apps before and always fell off after a few days. This challenge was different — each day built on the last, and by day 4, I actually looked forward to sitting still. My mornings haven\'t been the same since.',
    rating: 5,
  },
  {
    name: 'James T.',
    role: 'Software Engineer',
    text: 'As someone who overthinks everything, the body scan on day 4 was a revelation. I didn\'t realize how much tension I was carrying. The 7-day structure gave me just enough commitment without feeling overwhelming.',
    rating: 5,
  },
  {
    name: 'Priya K.',
    role: 'Graduate Student',
    text: 'The purpose visualization changed my perspective on my career. I went from feeling directionless to having real clarity about what matters to me. I\'ve recommended this to every friend who feels stuck.',
    rating: 5,
  },
];

const faqs = [
  {
    q: 'Do I need any meditation experience?',
    a: 'Not at all. This challenge is designed for complete beginners and experienced practitioners alike. Each session includes clear guidance, and the progression from day 1 to day 7 gently builds your skills.',
  },
  {
    q: 'What time of day should I meditate?',
    a: 'We recommend mornings for the best results, as it sets the tone for your day. However, these practices work at any time. Consistency matters more than timing — pick a time you can stick to for 7 days.',
  },
  {
    q: 'What if I miss a day?',
    a: 'Simply pick up where you left off. While the sessions are designed to build on each other, each one is also a complete practice. There\'s no penalty for taking a day off — just return when you\'re ready.',
  },
  {
    q: 'Is this really free?',
    a: 'Yes, completely free with no hidden costs. We believe meditation should be accessible to everyone. After the challenge, you\'ll have the option to explore our full content library — also free — for continued growth.',
  },
  {
    q: 'How will I receive the meditations?',
    a: 'After signing up, you\'ll receive a welcome email with a link to all 7 sessions. You can also access them directly on our site. Each morning, you\'ll get a brief email reminder with a direct link to that day\'s practice.',
  },
];

export default function MeditationChallengePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/50 to-background dark:from-blue-950/20 dark:via-purple-950/10 dark:to-background" />
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-200/20 blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Free 7-Day Challenge
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            7 Days to{' '}
            <span className="gradient-text">Inner Peace</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            A free guided meditation journey to help you find clarity, reduce stress, and connect with your purpose — just 10-15 minutes a day.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            {!submitted ? (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Start Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 justify-center w-full text-primary font-medium">
                <CheckCircle2 className="w-5 h-5" />
                Check your inbox — Day 1 is on its way!
              </div>
            )}
          </form>

          <p className="text-sm text-muted-foreground">Join 12,000+ people who have completed the challenge</p>
        </div>
      </section>

      {/* What You'll Experience */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground mb-4">
              What You&apos;ll Experience
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Seven carefully crafted sessions that build on each other, guiding you from your first breath to a complete practice.
            </p>
          </div>

          <div className="space-y-4">
            {days.map((d) => {
              const DayIcon = d.icon;
              return (
                <div
                  key={d.day}
                  className="group relative flex gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center flex-shrink-0`}>
                    <DayIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">Day {d.day}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {d.duration}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-2">{d.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{d.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground mb-4">
              What Participants Experience
            </h2>
            <p className="text-muted-foreground">Based on feedback from over 12,000 participants</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const BenIcon = b.icon;
              return (
                <div key={b.label} className="text-center p-6 rounded-2xl bg-background border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <BenIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{b.stat}</div>
                  <div className="text-sm text-muted-foreground">{b.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Stories of Transformation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl bg-muted/30 border border-border">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-lg mx-auto text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-gold-50 to-warm-50 border border-primary/20">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
            Start Your Free Challenge
          </h2>
          <p className="text-muted-foreground mb-6">
            7 days. 10 minutes a day. A calmer, clearer you.
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
                  Join Free
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 justify-center w-full text-primary font-medium">
                <CheckCircle2 className="w-5 h-5" />
                You&apos;re in! Check your email.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground text-center mb-14">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-background overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
