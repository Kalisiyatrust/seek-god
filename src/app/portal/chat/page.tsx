'use client';

import { useState, useRef, useEffect } from 'react';
import { cn, getInitials } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  ChevronLeft,
  Menu,
  Paperclip,
  Sparkles,
  Heart,
  BookOpen,
  MessageCircle,
  Plus,
  X,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

const agents = [
  { id: 'faith', name: 'Faith', description: 'General guidance & listening', icon: MessageCircle, color: 'bg-blue-100 text-blue-700' },
  { id: 'wisdom', name: 'Wisdom', description: 'Content & knowledge', icon: BookOpen, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'hope', name: 'Hope', description: 'Encouragement & support', icon: Heart, color: 'bg-purple-100 text-purple-700' },
];

const agentResponses: Record<string, string[]> = {
  faith: [
    "That's a really thoughtful question. Many people on this journey discover that their deepest purpose comes not from what they achieve, but from who they become in the process. What does fulfillment look like to you beyond your career?",
    "I hear you, and it's completely natural to feel that way. The fact that you're asking these questions shows incredible self-awareness. Let me share something — research shows that people who reflect on their values regularly report 40% higher life satisfaction. Would you like to explore what your core values might be?",
    "Thank you for sharing that with me. Your honesty is the first step toward real growth. I've seen many people in similar situations find that when they align their daily actions with their deeper purpose, everything starts to shift. What's one small thing that gives you a sense of meaning?",
    "That resonates deeply. You know, Viktor Frankl once said, 'He who has a why to live can bear almost any how.' It sounds like you're in the process of discovering your why. I'm here to walk alongside you in that discovery.",
    "I appreciate you opening up about this. Remember, this journey isn't about having all the answers — it's about asking better questions. And you're already doing that beautifully. What area of your life would you most like to see transformation in?",
  ],
  wisdom: [
    "Great question! I'd recommend starting with 'Man's Search for Meaning' by Viktor Frankl — we have a summary in our library. It beautifully explores how finding purpose can transform even the most difficult circumstances. Shall I share the key insights?",
    "Based on where you are in your journey, I think you'd find our article on 'The Science of Giving' fascinating. Research shows that generosity literally rewires our brain's reward centers. Would you like me to recommend a reading path tailored to your interests?",
    "That's a profound area to explore. Our content library has several pieces on this topic. I'd suggest starting with the video summary 'Finding Purpose Beyond Success' — it addresses exactly what you're describing, and many of our members found it transformative.",
    "The research is actually quite clear on this. Studies from the Greater Good Science Center show that purpose-driven individuals experience lower rates of cognitive decline, better sleep, and stronger immune function. Purpose isn't just philosophical — it's physiological. Want to learn more?",
  ],
  hope: [
    "I want you to know that what you're feeling is not only valid — it's a sign of growth. The fact that you're seeking something deeper means you're ready for the next chapter. I believe in you, and I've seen incredible transformations happen when someone takes this step.",
    "You're braver than you know for starting this conversation. Remember, every person who has ever found their purpose went through a period of searching first. You're not lost — you're exploring. And that's exactly where you need to be.",
    "I love that you're thinking about this! Did you know that you've already made more progress than you realize? Just by engaging in this journey, you've completed 3 milestones. Each small step forward is building toward something beautiful.",
    "Here's what I've noticed about your journey so far — you have a genuine heart for making a difference. That quality alone puts you in a position to change lives. The question isn't whether you'll find your purpose; it's how magnificent it will be when you fully embrace it.",
  ],
};

const chatHistory = [
  { id: 'c1', title: 'Finding my purpose', date: 'Today', preview: 'I\'ve been thinking about...' },
  { id: 'c2', title: 'Book recommendations', date: 'Yesterday', preview: 'What should I read next?' },
  { id: 'c3', title: 'Meditation guidance', date: 'Mar 8', preview: 'How do I start...' },
];

export default function ChatPage() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Send initial welcome message when agent changes
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      role: 'agent',
      content: selectedAgent.id === 'faith'
        ? "Welcome. I'm Faith, your personal guide. Whatever brings you here today — whether it's a question, a feeling, or just curiosity — I'm here to listen and help you find clarity. What's on your mind?"
        : selectedAgent.id === 'wisdom'
        ? "Hello! I'm Wisdom, your content and knowledge companion. I can recommend readings, share insights from our library, and help you explore topics that matter to you. What would you like to learn about?"
        : "Hi there! I'm Hope, and I'm so glad you're here. My role is to encourage you, celebrate your progress, and remind you of how far you've come. How are you feeling today?",
      timestamp: new Date(),
    }]);
  }, [selectedAgent]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    const delay = 1000 + Math.random() * 1500;
    setTimeout(() => {
      const responses = agentResponses[selectedAgent.id] || agentResponses.faith;
      const response: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'agent',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <div className="h-[calc(100vh-7rem)] -mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-8 flex">
      {/* Chat History Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-40 lg:static lg:z-auto">
          <div className="absolute inset-0 bg-black/30 lg:hidden" onClick={() => setShowSidebar(false)} />
          <aside className="relative z-10 w-72 h-full bg-card border-r border-border flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold">Chat History</h3>
              <button onClick={() => setShowSidebar(false)} className="lg:hidden p-1 rounded hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                <Plus className="w-4 h-4" /> New Conversation
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 space-y-1">
              {chatHistory.map(chat => (
                <button
                  key={chat.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{chat.date}</span>
                    <span className="text-xs text-muted-foreground truncate">{chat.preview}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50">
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowAgentSelector(!showAgentSelector)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', selectedAgent.color)}>
              <Bot className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">{selectedAgent.name}</p>
              <p className="text-[10px] text-muted-foreground">{selectedAgent.description}</p>
            </div>
          </button>
        </div>

        {/* Agent Selector Dropdown */}
        <AnimatePresence>
          {showAgentSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-border bg-card/80 overflow-hidden"
            >
              <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {agents.map(agent => {
                  const Icon = agent.icon;
                  const isSelected = selectedAgent.id === agent.id;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => { setSelectedAgent(agent); setShowAgentSelector(false); }}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left',
                        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                      )}
                    >
                      <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', agent.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{agent.name}</p>
                        <p className="text-[10px] text-muted-foreground">{agent.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'agent' && (
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', selectedAgent.color)}>
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className={cn(
                  'max-w-[80%] sm:max-w-[65%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card border border-border rounded-bl-md'
                )}>
                  {msg.content}
                  <p className={cn(
                    'text-[10px] mt-1.5',
                    msg.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'
                  )}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">JR</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', selectedAgent.color)}>
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-border bg-card/50">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <button className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={`Message ${selectedAgent.name}...`}
              className="flex-1 h-11 px-4 rounded-full border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className={cn(
                'w-11 h-11 rounded-full flex items-center justify-center transition-colors',
                input.trim()
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            <Sparkles className="w-3 h-3 inline mr-1" />
            AI-powered conversation &middot; Your chats are private and secure
          </p>
        </div>
      </div>
    </div>
  );
}
