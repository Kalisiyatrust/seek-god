'use client';

import { usePathname } from 'next/navigation';
import { MobileBottomNav } from './mobile-bottom-nav';
import { QuickAccessBar } from './quick-access-bar';
import { ChatWidget } from '@/components/chat/chat-widget';

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
    </>
  );
}
