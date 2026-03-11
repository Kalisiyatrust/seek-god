'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, ArrowRight, Sparkles } from 'lucide-react';

interface WidgetMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
}

const guestResponses = [
  "Welcome! I'm Faith, your guide to discovering purpose. What brings you here today? I'm listening.",
  "That's a beautiful question to be asking yourself. Many people who come to us are in a similar place — successful by external measures but seeking something deeper. You're not alone in feeling that way.",
  "I'd love to help you explore that further. We have a wonderful community of seekers just like you. To continue our conversation with personalized guidance, I'd recommend creating a free account. It unlocks your full journey experience!",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<WidgetMessage[]>([
    { id: 'w0', role: 'agent', content: "Hi! I'm Faith, a guide here at Seek God. I'm here to help you explore life's big questions. What's on your mind?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: WidgetMessage = { id: `wu-${Date.now()}`, role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    const count = messageCount + 1;
    setMessageCount(count);

    if (count >= 3) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setShowSignupPrompt(true);
      }, 1000);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      const response = guestResponses[Math.min(count, guestResponses.length - 1)];
      setMessages(prev => [...prev, { id: `wa-${Date.now()}`, role: 'agent', content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Chat with Faith</p>
                  <p className="text-[10px] opacity-80">AI Guide &middot; Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[280px]">
              {messages.map(msg => (
                <div key={msg.id} className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.role === 'agent' && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div className={cn(
                    'max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted rounded-bl-sm'
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                  <div className="bg-muted rounded-xl rounded-bl-sm px-3 py-2 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Signup Prompt */}
              {showSignupPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-primary/10 to-gold-50 border border-primary/20 rounded-xl p-4 text-center"
                >
                  <Sparkles className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium mb-1">Enjoying this conversation?</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Sign up for free to unlock your full journey with personalized AI guidance, assessments, and more.
                  </p>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Sign Up Free <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input */}
            {!showSignupPrompt && (
              <div className="px-3 py-2.5 border-t border-border">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 h-9 px-3 rounded-full border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className={cn(
                      'w-9 h-9 rounded-full flex items-center justify-center transition-colors',
                      input.trim() ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
