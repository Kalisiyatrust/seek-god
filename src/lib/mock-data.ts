import { Contact, ContentItem, DashboardStats, ReportData, AIAgent, Conversation, Message, LifeJourney } from '@/types';

// ============================================
// Mock Data for Development & Demo
// ============================================

export const mockDashboardStats: DashboardStats = {
  total_contacts: 2847,
  active_conversations: 342,
  engagement_rate: 68.5,
  conversion_rate: 23.2,
  total_donations: 45200,
  active_agents: 5,
  content_items: 156,
  new_contacts_today: 18,
};

export const mockReportData: ReportData[] = [
  { period: 'Jan', contacts_added: 120, messages_sent: 450, responses_received: 210, engagements: 180, conversions: 32, donations: 4200 },
  { period: 'Feb', contacts_added: 185, messages_sent: 620, responses_received: 340, engagements: 290, conversions: 48, donations: 6100 },
  { period: 'Mar', contacts_added: 210, messages_sent: 780, responses_received: 420, engagements: 360, conversions: 55, donations: 7800 },
  { period: 'Apr', contacts_added: 165, messages_sent: 590, responses_received: 310, engagements: 270, conversions: 42, donations: 5400 },
  { period: 'May', contacts_added: 240, messages_sent: 890, responses_received: 510, engagements: 430, conversions: 68, donations: 8900 },
  { period: 'Jun', contacts_added: 195, messages_sent: 720, responses_received: 380, engagements: 320, conversions: 52, donations: 6800 },
];

export const mockContacts: Contact[] = [
  {
    id: '1', full_name: 'James Robertson', email: 'james.r@example.com', phone: '+44 7700 900001',
    whatsapp: '+447700900001', status: 'engaged', source: 'Excel Upload', tags: ['high-value', 'tech'],
    notes: 'CEO of tech firm, interested in philanthropy', assigned_agent: 'Grace',
    financial_tier: 'high', engagement_score: 85, last_contacted: '2026-03-10T14:30:00Z',
    created_at: '2026-01-15T10:00:00Z', updated_at: '2026-03-10T14:30:00Z'
  },
  {
    id: '2', full_name: 'Sarah Mitchell', email: 'sarah.m@example.com', phone: '+44 7700 900002',
    whatsapp: '+447700900002', status: 'converted', source: 'Referral', tags: ['donor', 'finance'],
    notes: 'Fund manager, actively donating monthly', assigned_agent: 'Hope',
    financial_tier: 'high', engagement_score: 95, last_contacted: '2026-03-11T09:00:00Z',
    created_at: '2026-02-01T10:00:00Z', updated_at: '2026-03-11T09:00:00Z'
  },
  {
    id: '3', full_name: 'David Chen', email: 'david.c@example.com', phone: '+44 7700 900003',
    whatsapp: '+447700900003', status: 'contacted', source: 'Excel Upload', tags: ['entrepreneur'],
    notes: 'Serial entrepreneur, recently sold company', assigned_agent: 'Grace',
    financial_tier: 'high', engagement_score: 62, last_contacted: '2026-03-08T16:00:00Z',
    created_at: '2026-02-15T10:00:00Z', updated_at: '2026-03-08T16:00:00Z'
  },
  {
    id: '4', full_name: 'Emma Williams', email: 'emma.w@example.com', phone: '+44 7700 900004',
    whatsapp: '+447700900004', status: 'new', source: 'Website', tags: ['seeker'],
    notes: 'Found platform through Google search', assigned_agent: 'Faith',
    financial_tier: 'medium', engagement_score: 30, last_contacted: undefined,
    created_at: '2026-03-10T10:00:00Z', updated_at: '2026-03-10T10:00:00Z'
  },
  {
    id: '5', full_name: 'Michael Thompson', email: 'michael.t@example.com', phone: '+44 7700 900005',
    whatsapp: '+447700900005', status: 'engaged', source: 'Excel Upload', tags: ['real-estate', 'donor'],
    notes: 'Property developer, interested in community projects', assigned_agent: 'Hope',
    financial_tier: 'high', engagement_score: 78, last_contacted: '2026-03-09T11:00:00Z',
    created_at: '2026-01-20T10:00:00Z', updated_at: '2026-03-09T11:00:00Z'
  },
  {
    id: '6', full_name: 'Priya Patel', email: 'priya.p@example.com', phone: '+44 7700 900006',
    whatsapp: '+447700900006', status: 'engaged', source: 'Referral', tags: ['healthcare', 'mindful'],
    notes: 'Consultant doctor, seeking deeper purpose', assigned_agent: 'Faith',
    financial_tier: 'high', engagement_score: 72, last_contacted: '2026-03-07T13:00:00Z',
    created_at: '2026-02-10T10:00:00Z', updated_at: '2026-03-07T13:00:00Z'
  },
];

export const mockAIAgents: AIAgent[] = [
  {
    id: '1', name: 'Grace', type: 'outreach',
    description: 'Initial outreach agent. Connects with new contacts through warm, personalized messages.',
    personality: 'Warm, empathetic, and genuine. Opens conversations with curiosity about the person\'s life and accomplishments.',
    is_active: true,
    config: {
      greeting_template: 'Hello {name}, I came across your impressive work in {field}. At Seek God, we believe that true fulfillment comes from connecting our achievements with a deeper purpose...',
      followup_days: 3, tone: 'warm', channels: ['email', 'whatsapp'],
      max_messages_per_day: 50, working_hours: { start: '09:00', end: '18:00' }
    },
    stats: { messages_sent: 1240, responses_received: 620, engagement_rate: 50, conversions: 145 }
  },
  {
    id: '2', name: 'Hope', type: 'followup',
    description: 'Follow-up agent. Nurtures relationships with engaged contacts and encourages deeper involvement.',
    personality: 'Encouraging, patient, and inspirational. Shares relevant stories and content to keep engagement high.',
    is_active: true,
    config: {
      greeting_template: 'Hi {name}, I hope this week has brought you moments of peace. I wanted to share something that reminded me of our conversation...',
      followup_days: 7, tone: 'inspirational', channels: ['email', 'whatsapp', 'sms'],
      max_messages_per_day: 30, working_hours: { start: '08:00', end: '20:00' }
    },
    stats: { messages_sent: 890, responses_received: 534, engagement_rate: 60, conversions: 89 }
  },
  {
    id: '3', name: 'Faith', type: 'chat',
    description: 'Interactive chat agent. Available 24/7 on the platform for real-time conversations.',
    personality: 'Wise, compassionate, and understanding. Provides guidance and listens deeply to users\' concerns.',
    is_active: true,
    config: {
      greeting_template: 'Welcome to Seek God. I\'m Faith, your personal guide. Whatever brings you here today, I\'m here to listen and help you find clarity.',
      followup_days: 1, tone: 'warm', channels: ['platform_chat'],
      max_messages_per_day: 500, working_hours: { start: '00:00', end: '23:59' }
    },
    stats: { messages_sent: 3420, responses_received: 3100, engagement_rate: 90.6, conversions: 210 }
  },
  {
    id: '4', name: 'Wisdom', type: 'content',
    description: 'Content curation agent. Recommends personalized content based on user journey and interests.',
    personality: 'Scholarly, thoughtful, and insightful. Connects people with the right content at the right time.',
    is_active: true,
    config: {
      greeting_template: 'Based on where you are in your journey, I think you\'ll find this deeply meaningful...',
      followup_days: 5, tone: 'professional', channels: ['email', 'platform_chat'],
      max_messages_per_day: 100, working_hours: { start: '06:00', end: '22:00' }
    },
    stats: { messages_sent: 2100, responses_received: 1470, engagement_rate: 70, conversions: 156 }
  },
  {
    id: '5', name: 'Compass', type: 'analytics',
    description: 'Analytics agent. Monitors engagement patterns and suggests optimal outreach strategies.',
    personality: 'Analytical, strategic, and data-driven. Provides insights to improve engagement across all channels.',
    is_active: true,
    config: {
      greeting_template: '',
      followup_days: 0, tone: 'professional', channels: [],
      max_messages_per_day: 0, working_hours: { start: '00:00', end: '23:59' }
    },
    stats: { messages_sent: 0, responses_received: 0, engagement_rate: 0, conversions: 0 }
  },
];

export const mockContent: ContentItem[] = [
  {
    id: '1', title: 'Finding Purpose Beyond Success', type: 'video_summary',
    category: 'Purpose', description: 'A powerful exploration of why material success alone doesn\'t bring fulfillment.',
    content: 'This talk explores the paradox of success — how achieving everything society tells us to pursue can still leave us feeling empty. The speaker shares research showing that purpose-driven individuals report 64% higher life satisfaction than those focused solely on material goals. Key takeaway: Purpose isn\'t found at the top of the ladder; it\'s discovered by asking who you\'re climbing for.',
    thumbnail_url: '/images/purpose-thumb.jpg', source_attribution: 'Based on public domain motivational content',
    author: 'Seek God Editorial', duration: '8 min read',
    is_featured: true, is_premium: false, tags: ['purpose', 'success', 'fulfillment'],
    views: 12400, likes: 890, created_at: '2026-02-01T10:00:00Z'
  },
  {
    id: '2', title: 'The Science of Giving', type: 'blog',
    category: 'Generosity', description: 'How neuroscience proves that giving activates the same brain regions as receiving.',
    content: 'Research from the University of Zurich reveals that even the intention to be generous can trigger neural changes in the brain\'s reward center. The "warm glow" effect of giving isn\'t just emotional — it\'s neurological. Studies show that regular givers experience lower blood pressure, reduced stress hormones, and increased longevity. This article explores the science behind why helping others is literally good for your health.',
    source_attribution: 'Original content by Seek God',
    author: 'Dr. Sarah Mitchell', duration: '12 min read',
    is_featured: true, is_premium: false, tags: ['giving', 'science', 'health', 'generosity'],
    views: 8900, likes: 654, created_at: '2026-02-10T10:00:00Z'
  },
  {
    id: '3', title: 'Man\'s Search for Meaning - Key Insights', type: 'book_summary',
    category: 'Books', description: 'Viktor Frankl\'s timeless wisdom on finding meaning in any circumstance.',
    content: 'Viktor Frankl, a Holocaust survivor and psychiatrist, distilled his experiences into one of the most profound books ever written. His core insight: "He who has a why to live can bear almost any how." This summary covers the three key pillars of logotherapy — the freedom to find meaning, the meaning of life, and the meaning of suffering. Frankl argues that we don\'t get to choose our suffering, but we always get to choose how we respond to it.',
    source_attribution: 'Summary of public domain concepts from Viktor Frankl\'s philosophy',
    author: 'Seek God Editorial', duration: '15 min read',
    is_featured: true, is_premium: true, tags: ['books', 'meaning', 'psychology', 'resilience'],
    views: 15600, likes: 1200, created_at: '2026-01-20T10:00:00Z'
  },
  {
    id: '4', title: 'Morning Meditation for Inner Peace', type: 'audio',
    category: 'Mindfulness', description: 'A guided 10-minute meditation to start your day with clarity and purpose.',
    content: 'Begin your morning with this calming guided meditation that combines breathwork, gratitude practice, and purpose-setting. This session helps you center yourself before the demands of the day, creating a foundation of peace that carries through your hours.',
    media_url: '/audio/morning-meditation.mp3', source_attribution: 'Original content by Seek God',
    author: 'Seek God', duration: '10 min',
    is_featured: false, is_premium: false, tags: ['meditation', 'mindfulness', 'morning', 'peace'],
    views: 22100, likes: 1890, created_at: '2026-02-15T10:00:00Z'
  },
  {
    id: '5', title: 'Why Successful People Feel Empty', type: 'video_summary',
    category: 'Purpose', description: 'Understanding the void that achievements alone cannot fill.',
    content: 'Despite having everything — wealth, status, recognition — many high achievers describe a persistent emptiness. This phenomenon, sometimes called "arrival fallacy," occurs when reaching a long-pursued goal doesn\'t deliver the expected happiness. The summary explores three strategies: reconnecting with values, finding contribution-based meaning, and building genuine human connections that transcend professional networks.',
    thumbnail_url: '/images/empty-success-thumb.jpg', source_attribution: 'Based on public domain motivational content',
    author: 'Seek God Editorial', duration: '6 min read',
    is_featured: false, is_premium: false, tags: ['purpose', 'success', 'emptiness', 'meaning'],
    views: 9800, likes: 720, created_at: '2026-02-20T10:00:00Z'
  },
  {
    id: '6', title: 'The 7 Habits - Life Lessons', type: 'book_summary',
    category: 'Books', description: 'Stephen Covey\'s principles for personal effectiveness and character-based living.',
    content: 'Stephen Covey\'s "The 7 Habits of Highly Effective People" isn\'t really about productivity — it\'s about character. The seven habits progress from dependence to independence to interdependence. The most transformative? Habit 2: Begin with the End in Mind. It asks you to write your own eulogy — what do you want people to say about you? This exercise reveals that nobody wishes they had worked more; they wish they had loved more and served more.',
    source_attribution: 'Summary of concepts from Stephen Covey\'s public teachings',
    author: 'Seek God Editorial', duration: '14 min read',
    is_featured: false, is_premium: true, tags: ['books', 'habits', 'effectiveness', 'character'],
    views: 11200, likes: 890, created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: '7', title: 'How Donations Transform Communities', type: 'blog',
    category: 'Impact', description: 'Real stories of how small acts of giving created massive ripple effects.',
    content: 'When Maria donated just £50 to a village school in Kenya, she didn\'t expect what happened next. That single contribution inspired her network of friends to collectively raise £25,000, which built an entire wing of classrooms. This article shares five such stories where individual generosity sparked community transformation, proving that the size of the gift matters less than the intention behind it.',
    source_attribution: 'Original content by Seek God',
    author: 'Seek God Editorial', duration: '10 min read',
    is_featured: false, is_premium: false, tags: ['donations', 'impact', 'community', 'stories'],
    views: 7600, likes: 580, created_at: '2026-03-05T10:00:00Z'
  },
  {
    id: '8', title: 'Evening Gratitude Practice', type: 'audio',
    category: 'Mindfulness', description: 'Wind down your day with this reflective gratitude meditation.',
    content: 'End your day by reflecting on what went well, who you helped, and what you\'re grateful for. This guided session helps you process the day\'s events through a lens of gratitude and purpose, promoting restful sleep and a positive mindset for tomorrow.',
    media_url: '/audio/evening-gratitude.mp3', source_attribution: 'Original content by Seek God',
    author: 'Seek God', duration: '12 min',
    is_featured: false, is_premium: true, tags: ['meditation', 'gratitude', 'evening', 'reflection'],
    views: 18400, likes: 1540, created_at: '2026-02-25T10:00:00Z'
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1', contact_id: '1', channel: 'email', status: 'active',
    ai_agent_id: '1', created_at: '2026-03-01T10:00:00Z', updated_at: '2026-03-10T14:30:00Z',
    messages: [
      { id: 'm1', conversation_id: '1', sender_type: 'ai_agent', sender_id: '1', content: 'Hello James, I came across your impressive work in technology. At Seek God, we believe that true fulfillment comes from connecting our achievements with a deeper purpose. Would you be open to exploring what that might look like for you?', content_type: 'text', read: true, created_at: '2026-03-01T10:00:00Z' },
      { id: 'm2', conversation_id: '1', sender_type: 'user', sender_id: '1', content: 'Hi, this is interesting. I\'ve been thinking about this lately. Tell me more.', content_type: 'text', read: true, created_at: '2026-03-02T09:15:00Z' },
      { id: 'm3', conversation_id: '1', sender_type: 'ai_agent', sender_id: '1', content: 'Thank you for being open, James. Many successful people reach a point where they realize there\'s something more meaningful than the next milestone. We have a short assessment that can help you understand where you are on your life purpose journey. Would you like to try it?', content_type: 'text', read: true, created_at: '2026-03-02T10:00:00Z' },
    ]
  },
];

export const mockJourney: LifeJourney = {
  id: '1', user_id: '1', current_phase: 'awareness',
  milestones: [
    { id: '1', title: 'Completed Purpose Assessment', description: 'Took the first step in understanding your life purpose.', completed: true, completed_at: '2026-02-15T10:00:00Z' },
    { id: '2', title: 'First Chat Session', description: 'Had your first meaningful conversation with an AI guide.', completed: true, completed_at: '2026-02-20T10:00:00Z' },
    { id: '3', title: 'Read 5 Articles', description: 'Engaged with content that expands your perspective.', completed: true, completed_at: '2026-03-01T10:00:00Z' },
    { id: '4', title: 'Shared Your Story', description: 'Opened up about your journey with the community.', completed: false },
    { id: '5', title: 'Made First Donation', description: 'Experienced the joy of giving to someone in need.', completed: false },
    { id: '6', title: 'Mentored Someone', description: 'Helped another person find their purpose.', completed: false },
  ],
  assessments: [
    { id: '1', type: 'purpose', score: 65, answers: {}, completed_at: '2026-02-15T10:00:00Z' },
    { id: '2', type: 'wellbeing', score: 72, answers: {}, completed_at: '2026-02-20T10:00:00Z' },
  ],
  created_at: '2026-02-10T10:00:00Z'
};
