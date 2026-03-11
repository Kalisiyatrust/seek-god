import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockAIAgents } from '@/lib/mock-data';
import { generateResponse, getAgentTypeFromId, getAgentNameFromType } from '@/lib/ai-responses';

// POST /api/ai — AI chat endpoint
const chatSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  agent_id: z.string().min(1, 'Agent ID is required'),
  conversation_id: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { message, agent_id, conversation_id } = parsed.data;

    // Resolve agent
    const agent = mockAIAgents.find(a => a.id === agent_id);
    if (!agent) {
      return NextResponse.json(
        { error: `Agent with ID "${agent_id}" not found` },
        { status: 404 }
      );
    }

    if (!agent.is_active) {
      return NextResponse.json(
        { error: `Agent "${agent.name}" is currently inactive` },
        { status: 503 }
      );
    }

    // Generate contextual response based on agent personality
    const agentType = getAgentTypeFromId(agent_id);
    const responseText = generateResponse(agentType, message);

    return NextResponse.json({
      response: responseText,
      agent: agent.name,
      agent_type: agent.type,
      conversation_id: conversation_id || `conv_${crypto.randomUUID()}`,
      message_id: `msg_${crypto.randomUUID()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
