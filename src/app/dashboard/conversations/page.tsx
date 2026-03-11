'use client';

import { useState, useMemo } from 'react';
import { cn, formatRelativeTime, getInitials, truncateText } from '@/lib/utils';
import { mockConversations, mockContacts, mockAIAgents } from '@/lib/mock-data';
import { Conversation, Message, Contact } from '@/types';
import {
  Search,
  Send,
  Mail,
  MessageCircle,
  Smartphone,
  Monitor,
  Filter,
  Bot,
  User,
  Shield,
  ChevronLeft,
} from 'lucide-react';

const channelConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  email: { icon: <Mail className="w-4 h-4" />, label: 'Email', color: 'text-blue-500' },
  whatsapp: { icon: <MessageCircle className="w-4 h-4" />, label: 'WhatsApp', color: 'text-emerald-500' },
  sms: { icon: <Smartphone className="w-4 h-4" />, label: 'SMS', color: 'text-purple-500' },
  facebook: { icon: <Monitor className="w-4 h-4" />, label: 'Facebook', color: 'text-blue-600' },
  platform_chat: { icon: <Monitor className="w-4 h-4" />, label: 'Chat', color: 'text-gold-500' },
};

// Generate more conversations for demo purposes
const allConversations: (Conversation & { contact: Contact })[] = [
  ...mockConversations.map(conv => ({
    ...conv,
    contact: mockContacts.find(c => c.id === conv.contact_id) || mockContacts[0],
  })),
  {
    id: '2', contact_id: '2', channel: 'whatsapp' as const, status: 'active' as const,
    ai_agent_id: '2', created_at: '2026-03-05T10:00:00Z', updated_at: '2026-03-11T09:00:00Z',
    contact: mockContacts[1],
    messages: [
      { id: 'm4', conversation_id: '2', sender_type: 'ai_agent' as const, sender_id: '2', content: 'Hi Sarah, I hope this week has brought you moments of peace. I wanted to share an article about the science of giving that I think you\'ll find fascinating.', content_type: 'text' as const, read: true, created_at: '2026-03-09T08:00:00Z' },
      { id: 'm5', conversation_id: '2', sender_type: 'user' as const, sender_id: '2', content: 'Thank you! I read it and it really resonated with me. I\'ve been thinking about setting up a monthly donation.', content_type: 'text' as const, read: true, created_at: '2026-03-09T14:30:00Z' },
      { id: 'm6', conversation_id: '2', sender_type: 'ai_agent' as const, sender_id: '2', content: 'That\'s wonderful, Sarah! Your generosity can make a real difference. We have several causes that align with your interests in healthcare and education. Would you like me to share some options?', content_type: 'text' as const, read: true, created_at: '2026-03-09T15:00:00Z' },
      { id: 'm7', conversation_id: '2', sender_type: 'user' as const, sender_id: '2', content: 'Yes please! Particularly anything related to children\'s education in developing countries.', content_type: 'text' as const, read: true, created_at: '2026-03-10T10:00:00Z' },
    ],
  },
  {
    id: '3', contact_id: '3', channel: 'email' as const, status: 'active' as const,
    ai_agent_id: '1', created_at: '2026-03-06T10:00:00Z', updated_at: '2026-03-08T16:00:00Z',
    contact: mockContacts[2],
    messages: [
      { id: 'm8', conversation_id: '3', sender_type: 'ai_agent' as const, sender_id: '1', content: 'Hello David, congratulations on your recent business success. Many entrepreneurs find that after selling their company, they seek a new sense of purpose. Would you be open to exploring that?', content_type: 'text' as const, read: true, created_at: '2026-03-06T10:00:00Z' },
      { id: 'm9', conversation_id: '3', sender_type: 'user' as const, sender_id: '3', content: 'Interesting timing — I\'ve actually been feeling exactly that. Tell me more about what you offer.', content_type: 'text' as const, read: false, created_at: '2026-03-08T16:00:00Z' },
    ],
  },
  {
    id: '4', contact_id: '5', channel: 'sms' as const, status: 'active' as const,
    ai_agent_id: '2', created_at: '2026-03-04T10:00:00Z', updated_at: '2026-03-09T11:00:00Z',
    contact: mockContacts[4],
    messages: [
      { id: 'm10', conversation_id: '4', sender_type: 'ai_agent' as const, sender_id: '2', content: 'Hi Michael, thank you for your generous donation last month. I wanted to share the impact your contribution has made — it helped fund 3 community garden projects.', content_type: 'text' as const, read: true, created_at: '2026-03-07T09:00:00Z' },
      { id: 'm11', conversation_id: '4', sender_type: 'user' as const, sender_id: '5', content: 'That\'s amazing to hear! I\'d love to visit one of these projects. Is that possible?', content_type: 'text' as const, read: true, created_at: '2026-03-08T12:00:00Z' },
      { id: 'm12', conversation_id: '4', sender_type: 'admin' as const, sender_id: 'admin', content: 'Hi Michael, absolutely! I\'ll personally arrange a visit for you next week. Let me know which day works best.', content_type: 'text' as const, read: true, created_at: '2026-03-09T11:00:00Z' },
    ],
  },
  {
    id: '5', contact_id: '6', channel: 'platform_chat' as const, status: 'active' as const,
    ai_agent_id: '3', created_at: '2026-03-02T10:00:00Z', updated_at: '2026-03-07T13:00:00Z',
    contact: mockContacts[5],
    messages: [
      { id: 'm13', conversation_id: '5', sender_type: 'user' as const, sender_id: '6', content: 'I\'ve been feeling lost lately despite having a successful career. Can you help me find direction?', content_type: 'text' as const, read: true, created_at: '2026-03-02T10:00:00Z' },
      { id: 'm14', conversation_id: '5', sender_type: 'ai_agent' as const, sender_id: '3', content: 'Welcome Priya. What you\'re experiencing is more common than you might think — many accomplished professionals reach a point where external success no longer provides the fulfillment it once did. That takes courage to acknowledge. Would you like to start with our purpose assessment to gain some clarity?', content_type: 'text' as const, read: true, created_at: '2026-03-02T10:05:00Z' },
      { id: 'm15', conversation_id: '5', sender_type: 'user' as const, sender_id: '6', content: 'Yes, I\'d like that. I want to understand what\'s missing.', content_type: 'text' as const, read: true, created_at: '2026-03-02T10:10:00Z' },
    ],
  },
];

export default function ConversationsPage() {
  const [selectedId, setSelectedId] = useState<string>(allConversations[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [messageInput, setMessageInput] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);

  const filteredConversations = useMemo(() => {
    return allConversations.filter(conv => {
      const matchesSearch = !searchQuery ||
        conv.contact.full_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesChannel = channelFilter === 'all' || conv.channel === channelFilter;
      return matchesSearch && matchesChannel;
    });
  }, [searchQuery, channelFilter]);

  const selected = allConversations.find(c => c.id === selectedId);
  const agentName = selected ? mockAIAgents.find(a => a.id === selected.ai_agent_id)?.name || 'Unknown' : '';

  const handleSend = () => {
    if (!messageInput.trim()) return;
    // In real app, this would send via API
    setMessageInput('');
  };

  const selectConversation = (id: string) => {
    setSelectedId(id);
    setShowMobileList(false);
  };

  return (
    <div className="h-[calc(100vh-7rem)]">
      <div className="flex h-full bg-card border border-border rounded-xl overflow-hidden">
        {/* Conversation List */}
        <div className={cn(
          'w-full md:w-80 lg:w-96 border-r border-border flex flex-col flex-shrink-0',
          !showMobileList && 'hidden md:flex'
        )}>
          {/* List Header */}
          <div className="p-4 border-b border-border space-y-3">
            <h2 className="font-semibold text-lg">Conversations</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto">
              {[
                { value: 'all', label: 'All' },
                { value: 'email', label: 'Email' },
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'sms', label: 'SMS' },
                { value: 'platform_chat', label: 'Chat' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setChannelFilter(opt.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors',
                    channelFilter === opt.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation Items */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              const channel = channelConfig[conv.channel];
              const isSelected = conv.id === selectedId;
              const hasUnread = conv.messages.some(m => !m.read);
              return (
                <div
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={cn(
                    'flex items-start gap-3 p-4 cursor-pointer border-b border-border/50 transition-colors',
                    isSelected ? 'bg-primary/5' : 'hover:bg-muted/30'
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {getInitials(conv.contact.full_name)}
                    </div>
                    {hasUnread && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={cn('text-sm font-medium', hasUnread && 'font-semibold')}>{conv.contact.full_name}</span>
                      <span className="text-xs text-muted-foreground">{formatRelativeTime(lastMsg.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn('flex-shrink-0', channel.color)}>{channel.icon}</span>
                      <p className="text-xs text-muted-foreground truncate">{truncateText(lastMsg.content, 60)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredConversations.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No conversations found
              </div>
            )}
          </div>
        </div>

        {/* Message Thread */}
        <div className={cn(
          'flex-1 flex flex-col',
          showMobileList && 'hidden md:flex'
        )}>
          {selected ? (
            <>
              {/* Thread Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <button
                  onClick={() => setShowMobileList(true)}
                  className="md:hidden p-1.5 rounded-lg hover:bg-muted"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {getInitials(selected.contact.full_name)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{selected.contact.full_name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={channelConfig[selected.channel].color}>
                      {channelConfig[selected.channel].label}
                    </span>
                    <span>&middot;</span>
                    <span>Agent: {agentName}</span>
                    <span>&middot;</span>
                    <span className={cn(
                      'capitalize',
                      selected.status === 'active' ? 'text-emerald-500' : 'text-muted-foreground'
                    )}>
                      {selected.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selected.messages.map((msg) => {
                  const isAgent = msg.sender_type === 'ai_agent';
                  const isAdmin = msg.sender_type === 'admin';
                  const isUser = msg.sender_type === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={cn('flex gap-2', isUser ? 'justify-end' : 'justify-start')}
                    >
                      {!isUser && (
                        <div className={cn(
                          'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                          isAdmin ? 'bg-gold-100' : 'bg-muted'
                        )}>
                          {isAdmin ? <Shield className="w-3.5 h-3.5 text-gold-600" /> : <Bot className="w-3.5 h-3.5 text-muted-foreground" />}
                        </div>
                      )}
                      <div className={cn(
                        'max-w-[75%] px-4 py-2.5 rounded-2xl text-sm',
                        isUser
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : isAdmin
                            ? 'bg-gold-50 text-foreground border border-gold-200 rounded-bl-md'
                            : 'bg-muted text-foreground rounded-bl-md'
                      )}>
                        {(isAgent || isAdmin) && (
                          <p className={cn(
                            'text-[10px] font-medium mb-1',
                            isAdmin ? 'text-gold-600' : 'text-muted-foreground'
                          )}>
                            {isAdmin ? 'Admin' : agentName} ({isAdmin ? 'Admin Override' : 'AI Agent'})
                          </p>
                        )}
                        <p className="leading-relaxed">{msg.content}</p>
                        <p className={cn(
                          'text-[10px] mt-1.5',
                          isUser ? 'text-primary-foreground/60' : 'text-muted-foreground'
                        )}>
                          {formatRelativeTime(msg.created_at)}
                        </p>
                      </div>
                      {isUser && (
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-3.5 h-3.5 text-primary" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Send admin override message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      className="w-full h-10 px-4 pr-10 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Shield className="w-4 h-4 text-gold-500" />
                    </div>
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!messageInput.trim()}
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                      messageInput.trim()
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Messages sent here appear as admin overrides in the conversation
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p className="text-sm">Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
