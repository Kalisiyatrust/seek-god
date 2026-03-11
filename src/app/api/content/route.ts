import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { mockContent } from '@/lib/mock-data';
import { ContentItem } from '@/types';

// GET /api/content — list content items with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const premium = searchParams.get('premium');
    const tag = searchParams.get('tag');

    let filtered: ContentItem[] = [...mockContent];

    if (type && type !== 'all') {
      filtered = filtered.filter(c => c.type === type);
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(c =>
        c.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag) {
      filtered = filtered.filter(c =>
        c.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }

    if (featured === 'true') {
      filtered = filtered.filter(c => c.is_featured);
    }

    if (premium === 'true') {
      filtered = filtered.filter(c => c.is_premium);
    } else if (premium === 'false') {
      filtered = filtered.filter(c => !c.is_premium);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Extract unique categories and types for filter UI
    const categories = Array.from(new Set(mockContent.map(c => c.category)));
    const types = Array.from(new Set(mockContent.map(c => c.type)));

    return NextResponse.json({
      content: filtered,
      total: filtered.length,
      filters: { categories, types },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/content — create new content item
const createContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['video_summary', 'audio', 'blog', 'book_summary', 'quote']),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  thumbnail_url: z.string().optional(),
  media_url: z.string().optional(),
  source_attribution: z.string().optional(),
  author: z.string().optional(),
  duration: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_premium: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createContentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const newItem: ContentItem = {
      id: crypto.randomUUID(),
      ...parsed.data,
      views: 0,
      likes: 0,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(
      { content: newItem, message: 'Content created successfully' },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
