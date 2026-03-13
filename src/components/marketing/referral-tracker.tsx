'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function ReferralTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref) return;

    // Store in sessionStorage
    try {
      sessionStorage.setItem('referral_source', ref);
    } catch {
      // sessionStorage unavailable
    }

    // Send tracking event
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'referral_visit', data: { ref } }),
    }).catch(() => {
      // Tracking failed silently
    });
  }, [searchParams]);

  return null;
}
