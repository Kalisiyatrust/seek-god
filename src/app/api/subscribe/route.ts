import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBSCRIBERS_FILE = path.join('/tmp', 'subscribers.json');

// POST /api/subscribe — subscribe an email address
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const subscriber = {
      email: email.toLowerCase().trim(),
      source: source || 'unknown',
      subscribed_at: new Date().toISOString(),
    };

    // Try Supabase first
    let stored = false;
    try {
      const { createServerSupabaseClient } = await import('@/lib/supabase/server');
      const supabase = createServerSupabaseClient();
      const { error } = await supabase
        .from('email_subscribers')
        .upsert(
          { email: subscriber.email, source: subscriber.source, subscribed_at: subscriber.subscribed_at },
          { onConflict: 'email' }
        );
      if (!error) stored = true;
    } catch {
      // Supabase not available, fall through to JSON file
    }

    // Fallback: store in JSON file
    if (!stored) {
      let subscribers: Record<string, unknown>[] = [];
      try {
        const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
        subscribers = JSON.parse(data);
      } catch {
        // File doesn't exist yet
      }

      const exists = subscribers.some(
        (s: Record<string, unknown>) => s.email === subscriber.email
      );
      if (!exists) {
        subscribers.push(subscriber);
        await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
      }
    }

    // Future: webhook to Mailchimp/ConvertKit
    // if (process.env.MAILCHIMP_API_KEY) {
    //   await fetch(`https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email_address: subscriber.email, status: 'subscribed' }),
    //   });
    // }

    return NextResponse.json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
