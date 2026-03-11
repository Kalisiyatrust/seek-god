// ============================================
// Seek God Platform - Type Definitions
// ============================================

// User & Auth Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'vendor' | 'customer';
  phone?: string;
  bio?: string;
  created_at: string;
  last_login?: string;
  is_active: boolean;
}

// Contact Types (from uploaded Excel sheets)
export interface Contact {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  status: 'new' | 'contacted' | 'engaged' | 'converted' | 'inactive';
  source: string;
  tags: string[];
  notes?: string;
  assigned_agent?: string;
  financial_tier?: 'high' | 'medium' | 'unknown';
  engagement_score: number;
  last_contacted?: string;
  created_at: string;
  updated_at: string;
}

// Conversation Types
export interface Conversation {
  id: string;
  contact_id: string;
  channel: 'email' | 'whatsapp' | 'sms' | 'facebook' | 'platform_chat';
  messages: Message[];
  status: 'active' | 'paused' | 'completed';
  ai_agent_id: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_type: 'ai_agent' | 'user' | 'admin';
  sender_id: string;
  content: string;
  content_type: 'text' | 'audio' | 'image' | 'video' | 'link';
  metadata?: Record<string, any>;
  read: boolean;
  created_at: string;
}

// AI Agent Types
export interface AIAgent {
  id: string;
  name: string;
  type: 'outreach' | 'followup' | 'chat' | 'content' | 'analytics';
  description: string;
  personality: string;
  is_active: boolean;
  config: AgentConfig;
  stats: AgentStats;
}

export interface AgentConfig {
  greeting_template: string;
  followup_days: number;
  tone: 'warm' | 'professional' | 'inspirational';
  channels: string[];
  max_messages_per_day: number;
  working_hours: { start: string; end: string };
}

export interface AgentStats {
  messages_sent: number;
  responses_received: number;
  engagement_rate: number;
  conversions: number;
}

// Content Types
export interface ContentItem {
  id: string;
  title: string;
  type: 'video_summary' | 'audio' | 'blog' | 'book_summary' | 'quote';
  category: string;
  description: string;
  content: string;
  thumbnail_url?: string;
  media_url?: string;
  source_attribution?: string;
  author?: string;
  duration?: string;
  is_featured: boolean;
  is_premium: boolean;
  tags: string[];
  views: number;
  likes: number;
  created_at: string;
}

// Dashboard / Report Types
export interface DashboardStats {
  total_contacts: number;
  active_conversations: number;
  engagement_rate: number;
  conversion_rate: number;
  total_donations: number;
  active_agents: number;
  content_items: number;
  new_contacts_today: number;
}

export interface ReportData {
  period: string;
  contacts_added: number;
  messages_sent: number;
  responses_received: number;
  engagements: number;
  conversions: number;
  donations: number;
}

// Upload Types
export interface UploadResult {
  filename: string;
  total_rows: number;
  successful: number;
  failed: number;
  errors: string[];
}

// Journey / Life Purpose Types
export interface LifeJourney {
  id: string;
  user_id: string;
  current_phase: 'discovery' | 'awareness' | 'transformation' | 'purpose' | 'giving';
  milestones: Milestone[];
  assessments: Assessment[];
  created_at: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completed_at?: string;
}

export interface Assessment {
  id: string;
  type: 'purpose' | 'wellbeing' | 'fulfillment' | 'generosity';
  score: number;
  answers: Record<string, any>;
  completed_at: string;
}

// Donation Types  
export interface Donation {
  id: string;
  donor_id: string;
  amount: number;
  currency: string;
  cause: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  created_at: string;
}
