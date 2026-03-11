'use client';

import { cn } from '@/lib/utils';
import { mockJourney } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import {
  Compass,
  Eye,
  Zap,
  Target,
  Heart,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';

const phaseConfig = [
  { id: 'discovery', label: 'Discovery', icon: Compass, description: 'Start your journey by exploring who you are' },
  { id: 'awareness', label: 'Awareness', icon: Eye, description: 'Develop deeper understanding of your purpose' },
  { id: 'transformation', label: 'Transformation', icon: Zap, description: 'Begin to change and grow intentionally' },
  { id: 'purpose', label: 'Purpose', icon: Target, description: 'Live aligned with your true calling' },
  { id: 'giving', label: 'Giving', icon: Heart, description: 'Share your gifts with the world' },
] as const;

const assessmentTypes = [
  { type: 'purpose' as const, label: 'Purpose', color: 'bg-blue-100 text-blue-700 border-blue-200', barColor: 'bg-blue-500' },
  { type: 'wellbeing' as const, label: 'Wellbeing', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', barColor: 'bg-emerald-500' },
  { type: 'fulfillment' as const, label: 'Fulfillment', color: 'bg-purple-100 text-purple-700 border-purple-200', barColor: 'bg-purple-500' },
  { type: 'generosity' as const, label: 'Generosity', color: 'bg-gold-100 text-gold-700 border-gold-200', barColor: 'bg-gold-500' },
];

export default function JourneyPage() {
  const journey = mockJourney;
  const currentPhaseIndex = phaseConfig.findIndex(p => p.id === journey.current_phase);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold">My Journey</h1>
        <p className="text-muted-foreground mt-1">Track your progress through the five phases of purpose</p>
      </div>

      {/* Journey Map */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="font-semibold text-lg mb-6">Journey Map</h2>
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-8 left-8 right-8 h-0.5 bg-border hidden sm:block" />
          <div
            className="absolute top-8 left-8 h-0.5 bg-primary hidden sm:block transition-all"
            style={{ width: `${(currentPhaseIndex / (phaseConfig.length - 1)) * (100 - 12)}%` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {phaseConfig.map((phase, i) => {
              const Icon = phase.icon;
              const isCompleted = i < currentPhaseIndex;
              const isCurrent = i === currentPhaseIndex;
              const isFuture = i > currentPhaseIndex;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all relative z-10',
                    isCompleted && 'bg-primary text-primary-foreground shadow-md',
                    isCurrent && 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20 animate-pulse-glow',
                    isFuture && 'bg-muted text-muted-foreground'
                  )}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className={cn(
                    'text-sm font-semibold mb-1',
                    isCurrent && 'text-primary'
                  )}>
                    {phase.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">{phase.description}</p>
                  {isCurrent && (
                    <span className="mt-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                      Current
                    </span>
                  )}
                  {isCompleted && (
                    <span className="mt-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-medium">
                      Complete
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="font-semibold text-lg mb-4">Milestones</h2>
        <div className="space-y-3">
          {journey.milestones.map((milestone, i) => (
            <div
              key={milestone.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg transition-colors',
                milestone.completed ? 'bg-emerald-50/50' : 'hover:bg-muted/30'
              )}
            >
              {milestone.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={cn(
                  'text-sm font-medium',
                  milestone.completed && 'text-emerald-800'
                )}>
                  {milestone.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{milestone.description}</p>
              </div>
              {milestone.completed && milestone.completed_at && (
                <span className="text-[10px] text-emerald-600 flex-shrink-0">
                  {new Date(milestone.completed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Assessments */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="font-semibold text-lg mb-4">Assessments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assessmentTypes.map(at => {
            const taken = journey.assessments.find(a => a.type === at.type);
            return (
              <div key={at.type} className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium border', at.color)}>
                    {at.label}
                  </span>
                  {taken && <span className="text-2xl font-bold">{taken.score}</span>}
                </div>
                {taken ? (
                  <>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                      <div className={cn('h-full rounded-full', at.barColor)} style={{ width: `${taken.score}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Completed {new Date(taken.completed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </>
                ) : (
                  <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                    <ClipboardCheck className="w-4 h-4" />
                    Take Assessment
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
