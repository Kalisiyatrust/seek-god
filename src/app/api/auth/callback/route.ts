import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// GET /api/auth/callback — Supabase auth callback
export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = request.nextUrl;
    const code = searchParams.get('code');
    const next = searchParams.get('next') || '/portal';

    if (!code) {
      // No auth code provided — redirect to home with error
      const redirectUrl = new URL('/?error=no_code', origin);
      return NextResponse.redirect(redirectUrl);
    }

    const supabase = createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error.message);
      const redirectUrl = new URL(`/?error=auth_failed`, origin);
      return NextResponse.redirect(redirectUrl);
    }

    // Successful auth — redirect to portal or specified page
    const redirectUrl = new URL(next, origin);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Auth callback failed';
    console.error('Auth callback exception:', message);
    const redirectUrl = new URL('/?error=callback_exception', request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }
}
