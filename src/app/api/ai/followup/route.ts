import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockContacts } from '@/lib/mock-data';

// POST /api/ai/followup — schedule follow-up messages
const followupSchema = z.object({
  contact_ids: z.array(z.string()).min(1, 'At least one contact ID is required'),
  channel: z.enum(['email', 'whatsapp', 'sms', 'platform_chat']),
  template: z.string().min(1, 'Message template is required'),
  scheduled_at: z.string().optional(),
  agent_id: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = followupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { contact_ids, channel, template, scheduled_at, agent_id } = parsed.data;

    // Validate contact IDs exist
    const validContacts = contact_ids.filter(id =>
      mockContacts.some(c => c.id === id)
    );
    const invalidContacts = contact_ids.filter(id =>
      !mockContacts.some(c => c.id === id)
    );

    // Check channel availability for each contact
    const channelCheck = validContacts.map(id => {
      const contact = mockContacts.find(c => c.id === id)!;
      let hasChannel = true;
      if (channel === 'email' && !contact.email) hasChannel = false;
      if (channel === 'whatsapp' && !contact.whatsapp) hasChannel = false;
      if (channel === 'sms' && !contact.phone) hasChannel = false;
      return { id, name: contact.full_name, hasChannel };
    });

    const schedulable = channelCheck.filter(c => c.hasChannel);
    const undeliverable = channelCheck.filter(c => !c.hasChannel);

    const scheduledTime = scheduled_at || new Date(Date.now() + 3600000).toISOString(); // default: 1 hour from now

    return NextResponse.json({
      status: 'scheduled',
      scheduled_count: schedulable.length,
      scheduled_at: scheduledTime,
      channel,
      agent_id: agent_id || '2', // default to Hope (follow-up agent)
      contacts_scheduled: schedulable.map(c => ({ id: c.id, name: c.name })),
      warnings: [
        ...invalidContacts.map(id => `Contact "${id}" not found`),
        ...undeliverable.map(c => `Contact "${c.name}" has no ${channel} address`),
      ],
      message: `${schedulable.length} follow-up messages scheduled via ${channel}`,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
