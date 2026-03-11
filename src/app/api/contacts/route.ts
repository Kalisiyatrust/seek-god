import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockContacts } from '@/lib/mock-data';
import { Contact } from '@/types';

// GET /api/contacts — list contacts with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const tier = searchParams.get('tier');
    const source = searchParams.get('source');
    const agent = searchParams.get('agent');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    let filtered: Contact[] = [...mockContacts];

    if (status && status !== 'all') {
      filtered = filtered.filter(c => c.status === status);
    }

    if (tier && tier !== 'all') {
      filtered = filtered.filter(c => c.financial_tier === tier);
    }

    if (source && source !== 'all') {
      filtered = filtered.filter(c =>
        c.source.toLowerCase() === source.toLowerCase()
      );
    }

    if (agent) {
      filtered = filtered.filter(c =>
        c.assigned_agent?.toLowerCase() === agent.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.full_name.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return NextResponse.json({
      contacts: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/contacts — create a new contact
const createContactSchema = z.object({
  full_name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  source: z.string().default('Manual Entry'),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
  financial_tier: z.enum(['high', 'medium', 'unknown']).default('unknown'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newContact: Contact = {
      id: crypto.randomUUID(),
      ...parsed.data,
      status: 'new',
      assigned_agent: undefined,
      engagement_score: 0,
      last_contacted: undefined,
      created_at: now,
      updated_at: now,
    };

    return NextResponse.json(
      { contact: newContact, message: 'Contact created successfully' },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
