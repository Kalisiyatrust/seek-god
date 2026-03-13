import { NextRequest, NextResponse } from 'next/server';

// POST /api/track — log tracking events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, data } = body;

    // Log for now — ready for future analytics integrations
    console.log('[Track]', { event, data, timestamp: new Date().toISOString() });

    // Future: send to analytics service
    // if (process.env.ANALYTICS_ENDPOINT) {
    //   await fetch(process.env.ANALYTICS_ENDPOINT, { method: 'POST', body: JSON.stringify({ event, data }) });
    // }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
