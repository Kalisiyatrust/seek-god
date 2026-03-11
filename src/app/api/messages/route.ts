import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockConversations, mockContacts, mockAIAgents } from '@/lib/mock-data';
import { generateResponse, getAgentTypeFromId } from '@/lib/ai-responses';
import { Conversation, Message } from '@/types';

// GET /api/messages — list conversations with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const contactId = searchParams.get('contact_id');
    const channel = searchParams.get('channel');
    const status = searchParams.get('status');
    const agentId = searchParams.get('agent_id');

    let filtered: Conversation[] = [...mockConversations];

    if (contactId) {
      filtered = filtered.filter(c => c.contact_id === contactId);
    }

    if (channel && channel !== 'all') {
      filtered = filtered.filter(c => c.channel === channel);
    }

    if (status && status !== 'all') {
      filtered = filtered.filter(c => c.status === status);
    }

    if (agentId) {
      filtered = filtered.filter(c => c.ai_agent_id === agentId);
    }

    // Enrich conversations with contact and agent info
    const enriched = filtered.map(conv => {
      const contact = mockContacts.find(c => c.id === conv.contact_id);
      const agent = mockAIAgents.find(a => a.id === conv.ai_agent_id);
      return {
        ...conv,
        contact_name: contact?.full_name || 'Unknown',
        agent_name: agent?.name || 'Unknown',
      };
    });

    return NextResponse.json({ conversations: enriched });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/messages — send a message and get AI response
const sendMessageSchema = z.object({
  conversation_id: z.string().min(1),
  content: z.string().min(1, 'Message cannot be empty'),
  sender_type: z.enum(['user', 'admin']).default('user'),
  sender_id: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = sendMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { conversation_id, content, sender_type, sender_id } = parsed.data;

    // Find the conversation to determine the agent
    const conversation = mockConversations.find(c => c.id === conversation_id);
    const agentId = conversation?.ai_agent_id || '3'; // default to Faith (chat)
    const agent = mockAIAgents.find(a => a.id === agentId);
    const agentType = getAgentTypeFromId(agentId);

    const now = new Date().toISOString();

    // Create the user's message
    const userMessage: Message = {
      id: `msg_${crypto.randomUUID()}`,
      conversation_id,
      sender_type,
      sender_id: sender_id || 'user',
      content,
      content_type: 'text',
      read: true,
      created_at: now,
    };

    // Generate AI response
    const aiResponseContent = generateResponse(agentType, content);
    const aiMessage: Message = {
      id: `msg_${crypto.randomUUID()}`,
      conversation_id,
      sender_type: 'ai_agent',
      sender_id: agentId,
      content: aiResponseContent,
      content_type: 'text',
      read: false,
      created_at: new Date(Date.now() + 2000).toISOString(), // 2 seconds later
    };

    return NextResponse.json({
      user_message: userMessage,
      ai_response: aiMessage,
      agent_name: agent?.name || 'Faith',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
