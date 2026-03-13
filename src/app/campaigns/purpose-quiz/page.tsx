'use client';

import { useState, useCallback } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Mail,
  BookOpen,
  Video,
  Headphones,
  Star,
  Target,
  Heart,
  Lightbulb,
  Users,
  Compass,
} from 'lucide-react';

const questions = [
  {
    id: 1,
    question: 'When you imagine a life well-lived, what matters most?',
    options: [
      { text: 'Leaving a lasting impact on the world', archetype: 'visionary' },
      { text: 'Helping others heal and grow', archetype: 'healer' },
      { text: 'Creating something beautiful and original', archetype: 'creative' },
      { text: 'Understanding deep truths about life', archetype: 'seeker' },
      { text: 'Bringing people together in community', archetype: 'builder' },
    ],
  },
  {
    id: 2,
    question: 'In a group setting, you naturally tend to:',
    options: [
      { text: 'Cast a vision and inspire others to follow', archetype: 'visionary' },
      { text: 'Notice who is struggling and offer support', archetype: 'healer' },
      { text: 'Come up with innovative ideas and solutions', archetype: 'creative' },
      { text: 'Ask the deep questions others overlook', archetype: 'seeker' },
      { text: 'Connect people and build relationships', archetype: 'builder' },
    ],
  },
  {
    id: 3,
    question: 'Which book title appeals to you most?',
    options: [
      { text: 'Bold Moves: Leading Change in Uncertain Times', archetype: 'visionary' },
      { text: 'The Art of Presence: Being There for Others', archetype: 'healer' },
      { text: 'Originals: How Non-Conformists Move the World', archetype: 'creative' },
      { text: 'The Examined Life: Philosophy for the Modern Soul', archetype: 'seeker' },
      { text: 'Together: The Healing Power of Connection', archetype: 'builder' },
    ],
  },
  {
    id: 4,
    question: 'What frustrates you most about the world?',
    options: [
      { text: 'Lack of bold leadership and direction', archetype: 'visionary' },
      { text: 'Unnecessary suffering and neglect', archetype: 'healer' },
      { text: 'Conformity and lack of imagination', archetype: 'creative' },
      { text: 'Shallow thinking and surface-level living', archetype: 'seeker' },
      { text: 'Division and isolation between people', archetype: 'builder' },
    ],
  },
  {
    id: 5,
    question: 'Your ideal weekend involves:',
    options: [
      { text: 'Planning a new project or venture', archetype: 'visionary' },
      { text: 'Volunteering or caring for someone', archetype: 'healer' },
      { text: 'Making art, writing, or building something', archetype: 'creative' },
      { text: 'Reading, reflecting, or journaling', archetype: 'seeker' },
      { text: 'Hosting friends or attending a gathering', archetype: 'builder' },
    ],
  },
  {
    id: 6,
    question: 'When facing a difficult decision, you rely most on:',
    options: [
      { text: 'Your vision of the bigger picture', archetype: 'visionary' },
      { text: 'Your empathy and intuition about people', archetype: 'healer' },
      { text: 'Your creative instincts and originality', archetype: 'creative' },
      { text: 'Deep reflection and inner wisdom', archetype: 'seeker' },
      { text: 'Advice from your trusted community', archetype: 'builder' },
    ],
  },
  {
    id: 7,
    question: 'Which compliment would mean the most to you?',
    options: [
      { text: '"You changed the way I see what\'s possible"', archetype: 'visionary' },
      { text: '"You made me feel seen and understood"', archetype: 'healer' },
      { text: '"Your work moved me deeply"', archetype: 'creative' },
      { text: '"You helped me understand something profound"', archetype: 'seeker' },
      { text: '"You brought us all together"', archetype: 'builder' },
    ],
  },
  {
    id: 8,
    question: 'What role does spirituality play in your life?',
    options: [
      { text: 'It fuels my drive to make a difference', archetype: 'visionary' },
      { text: 'It deepens my compassion for others', archetype: 'healer' },
      { text: 'It inspires my creative expression', archetype: 'creative' },
      { text: 'It is the foundation of my inner life', archetype: 'seeker' },
      { text: 'It connects me with others who share my values', archetype: 'builder' },
    ],
  },
  {
    id: 9,
    question: 'If you had unlimited resources, you would:',
    options: [
      { text: 'Launch an organization to solve a global problem', archetype: 'visionary' },
      { text: 'Build a center for healing and recovery', archetype: 'healer' },
      { text: 'Fund artists and creative projects worldwide', archetype: 'creative' },
      { text: 'Create a school for wisdom and contemplation', archetype: 'seeker' },
      { text: 'Build a community center for your neighborhood', archetype: 'builder' },
    ],
  },
  {
    id: 10,
    question: 'What legacy do you want to leave behind?',
    options: [
      { text: 'A world transformed by bold action', archetype: 'visionary' },
      { text: 'Lives healed and hearts restored', archetype: 'healer' },
      { text: 'Beauty and meaning that outlast my lifetime', archetype: 'creative' },
      { text: 'Wisdom passed down through generations', archetype: 'seeker' },
      { text: 'A stronger, more connected community', archetype: 'builder' },
    ],
  },
];

type ArchetypeKey = 'visionary' | 'healer' | 'creative' | 'seeker' | 'builder';

const archetypes: Record<
  ArchetypeKey,
  {
    title: string;
    icon: typeof Target;
    description: string;
    strengths: string[];
    content: { title: string; type: string; href: string }[];
  }
> = {
  visionary: {
    title: 'The Visionary Leader',
    icon: Target,
    description:
      'You are driven by a deep desire to create change and lead others toward a better future. Your purpose centers on casting bold visions, inspiring action, and making a meaningful impact on the world around you. Viktor Frankl would say your meaning comes from the work you give to the world.',
    strengths: ['Strategic thinking', 'Inspiring others', 'Bold action', 'Future-oriented mindset'],
    content: [
      { title: 'The Question That Changes Everything', type: 'Video', href: '/content/videos' },
      { title: 'Leading with Purpose in Uncertain Times', type: 'Blog', href: '/content/blogs' },
      { title: 'Morning Centering Practice', type: 'Audio', href: '/content/audio' },
    ],
  },
  healer: {
    title: 'The Compassionate Healer',
    icon: Heart,
    description:
      'Your purpose flows from a profound capacity for empathy and care. You are drawn to alleviate suffering, hold space for pain, and guide others toward wholeness. Martin Seligman\'s research shows that those who use their strengths in service of others experience the deepest fulfillment.',
    strengths: ['Deep empathy', 'Active listening', 'Emotional intelligence', 'Nurturing presence'],
    content: [
      { title: 'The Art of Compassionate Presence', type: 'Blog', href: '/content/blogs' },
      { title: 'Loving-Kindness Meditation', type: 'Audio', href: '/content/audio' },
      { title: 'Healing Through Connection', type: 'Video', href: '/content/videos' },
    ],
  },
  creative: {
    title: 'The Creative Catalyst',
    icon: Lightbulb,
    description:
      'You bring fresh perspectives, originality, and beauty into the world. Your purpose is expressed through creation — whether that\'s art, innovation, storytelling, or new ways of thinking. Mihaly Csikszentmihalyi\'s research on flow states shows that creative engagement is one of the highest forms of human fulfillment.',
    strengths: ['Original thinking', 'Aesthetic sensibility', 'Innovation', 'Expressive communication'],
    content: [
      { title: 'Creativity as Spiritual Practice', type: 'Blog', href: '/content/blogs' },
      { title: 'Finding Flow in Daily Life', type: 'Video', href: '/content/videos' },
      { title: 'Creative Visualization Guide', type: 'Audio', href: '/content/audio' },
    ],
  },
  seeker: {
    title: 'The Wisdom Seeker',
    icon: Compass,
    description:
      'You are on a lifelong quest for understanding, truth, and meaning. Your purpose lies in going deeper — through reflection, study, and contemplation — and sharing the wisdom you discover. The Socratic tradition reminds us that the examined life is the only life worth living.',
    strengths: ['Deep reflection', 'Intellectual curiosity', 'Pattern recognition', 'Philosophical insight'],
    content: [
      { title: 'The Examined Life: Why Reflection Matters', type: 'Blog', href: '/content/blogs' },
      { title: 'Guided Contemplation Practice', type: 'Audio', href: '/content/audio' },
      { title: 'Ancient Wisdom for Modern Living', type: 'Video', href: '/content/videos' },
    ],
  },
  builder: {
    title: 'The Community Builder',
    icon: Users,
    description:
      'You find deepest purpose in connection, belonging, and togetherness. Your gift is bringing people together, fostering trust, and creating spaces where everyone belongs. Research consistently shows that strong social bonds are the single greatest predictor of human wellbeing and longevity.',
    strengths: ['Relationship building', 'Inclusivity', 'Collaboration', 'Trust cultivation'],
    content: [
      { title: 'The Power of Belonging', type: 'Blog', href: '/content/blogs' },
      { title: 'Building Meaningful Community', type: 'Video', href: '/content/videos' },
      { title: 'Connection Meditation', type: 'Audio', href: '/content/audio' },
    ],
  },
};

export default function PurposeQuizPage() {
  const [stage, setStage] = useState<'intro' | 'quiz' | 'email' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ArchetypeKey[]>([]);
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleAnswer = useCallback(
    (archetype: ArchetypeKey, optionIndex: number) => {
      setSelectedOption(optionIndex);
      setTimeout(() => {
        setTransitioning(true);
        setTimeout(() => {
          const newAnswers = [...answers, archetype];
          setAnswers(newAnswers);
          setSelectedOption(null);
          setTransitioning(false);
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
          } else {
            setStage('email');
          }
        }, 300);
      }, 400);
    },
    [answers, currentQuestion]
  );

  const goBack = useCallback(() => {
    if (currentQuestion > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setAnswers(answers.slice(0, -1));
        setTransitioning(false);
      }, 300);
    }
  }, [currentQuestion, answers]);

  const getResult = useCallback((): ArchetypeKey => {
    const counts: Record<ArchetypeKey, number> = {
      visionary: 0,
      healer: 0,
      creative: 0,
      seeker: 0,
      builder: 0,
    };
    answers.forEach((a) => {
      counts[a]++;
    });
    return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as ArchetypeKey);
  }, [answers]);

  const handleShare = useCallback(() => {
    const result = archetypes[getResult()];
    if (navigator.share) {
      navigator.share({
        title: `I'm ${result.title}!`,
        text: `I just discovered my purpose archetype on Seek God: ${result.title}. Take the quiz to find yours!`,
        url: 'https://seek-god.com/campaigns/purpose-quiz',
      }).catch(() => {});
    }
  }, [getResult]);

  const progress = stage === 'quiz' ? ((currentQuestion + 1) / questions.length) * 100 : stage === 'intro' ? 0 : 100;
  const resultArchetype = answers.length === 10 ? archetypes[getResult()] : null;
  const ResultIcon = resultArchetype?.icon ?? Sparkles;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Progress Bar */}
      {stage === 'quiz' && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* INTRO STAGE */}
      {stage === 'intro' && (
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-50 via-warm-50/50 to-background" />
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-gold-200/20 blur-3xl" />

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Free Assessment — 5 Minutes
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Discover Your{' '}
              <span className="gradient-text">Life Purpose</span>
              {' '}in 5 Minutes
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Take our free assessment based on research from Viktor Frankl, Martin Seligman, and modern positive psychology to uncover your unique purpose archetype.
            </p>

            <button
              onClick={() => setStage('quiz')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start the Quiz
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
              {[
                { num: '10', label: 'Questions' },
                { num: '5', label: 'Archetypes' },
                { num: '50K+', label: 'Taken' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.num}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUIZ STAGE */}
      {stage === 'quiz' && (
        <section className="pt-24 pb-20 px-4 min-h-screen flex items-center">
          <div className="max-w-2xl mx-auto w-full">
            <div className="mb-8 flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={currentQuestion === 0}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <span className="text-sm font-medium text-muted-foreground">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>

            <div className={`transition-all duration-300 ${transitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-8">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.archetype as ArchetypeKey, idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
                      selectedOption === idx
                        ? 'border-primary bg-primary/10 scale-[0.98]'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-10">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx < currentQuestion
                      ? 'bg-primary'
                      : idx === currentQuestion
                        ? 'bg-primary w-6'
                        : 'bg-muted-foreground/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EMAIL CAPTURE STAGE */}
      {stage === 'email' && (
        <section className="pt-32 pb-20 px-4 min-h-screen flex items-center">
          <div className="max-w-lg mx-auto w-full text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Your Results Are Ready!
            </h2>
            <p className="text-muted-foreground mb-8">
              Get your detailed purpose report sent to your email, including personalized content recommendations and next steps.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={() => setStage('result')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Report
              </button>
            </div>

            <button
              onClick={() => setStage('result')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Skip — just show my results
            </button>
          </div>
        </section>
      )}

      {/* RESULT STAGE */}
      {stage === 'result' && resultArchetype && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Result Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-gold-50 to-warm-50 p-8 sm:p-12 mb-10 border border-primary/20">
              <div className="absolute top-4 right-4 w-40 h-40 rounded-full bg-primary/5 blur-2xl" />
              <div className="relative text-center">
                <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
                  <ResultIcon className="w-10 h-10 text-primary" />
                </div>
                <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">Your Purpose Archetype</p>
                <h1 className="text-3xl sm:text-5xl font-display font-bold text-foreground mb-6">
                  {resultArchetype.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {resultArchetype.description}
                </p>
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-10">
              <h3 className="text-xl font-display font-bold text-foreground mb-4">Your Core Strengths</h3>
              <div className="grid grid-cols-2 gap-3">
                {resultArchetype.strengths.map((s) => (
                  <div key={s} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
                    <Star className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Content */}
            <div className="mb-10">
              <h3 className="text-xl font-display font-bold text-foreground mb-4">Recommended For You</h3>
              <div className="grid gap-3">
                {resultArchetype.content.map((item) => {
                  const TypeIcon = item.type === 'Video' ? Video : item.type === 'Audio' ? Headphones : BookOpen;
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <TypeIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium group-hover:text-primary transition-colors">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.type}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg"
              >
                Start Your Full Journey
                <ArrowRight className="w-5 h-5" />
              </a>
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-full font-semibold hover:bg-muted/50 transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share Your Profile
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
