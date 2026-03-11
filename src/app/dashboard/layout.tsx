'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Upload,
  Bot,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Menu,
  X,
  Shield,
} from 'lucide-react';

const sidebarLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/contacts', label: 'Contacts', icon: Users },
  { href: '/dashboard/upload', label: 'Upload Data', icon: Upload },
  { href: '/dashboard/agents', label: 'AI Agents', icon: Bot },
  { href: '/dashboard/conversations', label: 'Conversations', icon: MessageSquare },
  { href: '/dashboard/content-mgmt', label: 'Content', icon: FileText },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">SG</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-white font-display font-bold text-lg leading-tight">Seek God</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Shield className="w-3 h-3 text-gold-400" />
              <span className="text-[11px] text-gold-400 font-medium tracking-wide uppercase">Admin Portal</span>
            </div>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-gold-500/20 text-gold-400 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? link.label : undefined}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', active && 'text-gold-400')} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle (desktop only) */}
      <div className="hidden lg:block border-t border-white/10 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col bg-[#1a1a2e] transition-all duration-300 flex-shrink-0',
          collapsed ? 'w-[68px]' : 'w-64'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a2e] transform transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="absolute top-4 right-3">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search contacts, conversations..."
                className="w-64 lg:w-80 h-9 pl-9 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full" />
            </button>
            <div className="h-8 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">AD</span>
              </div>
              <span className="hidden sm:block text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
