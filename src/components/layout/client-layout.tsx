'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { MobileBottomNav } from './mobile-bottom-nav';
import { QuickAccessBar } from './quick-access-bar';
import { ChatWidget } from '@/components/chat/chat-widget';
import { EmailPopup } from '@/components/marketing/email-popup';
import { ReferralTracker } from '@/components/marketing/referral-tracker';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const isAuth = pathname === '/login' || pathname === '/signup';

  return (
    <>
      <div className={isDashboard || isAuth ? '' : 'pb-20 md:pb-0'}>
        {!isDashboard && !isAuth && <QuickAccessBar />}
        {children}
      </div>
      {!isDashboard && !isAuth && <MobileBottomNav />}
      {!isDashboard && !isAuth && <ChatWidget />}
      {!isDashboard && !isAuth && <EmailPopup />}
      <Suspense fallback={null}>
        <ReferralTracker />
      </Suspense>
    </>
  );
}
