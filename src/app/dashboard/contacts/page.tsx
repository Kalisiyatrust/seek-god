'use client';

import { useState, useMemo } from 'react';
import { cn, formatRelativeTime, getInitials, formatDate } from '@/lib/utils';
import { mockContacts } from '@/lib/mock-data';
import { Contact } from '@/types';
import {
  Search,
  Filter,
  Download,
  UserPlus,
  X,
  Mail,
  Phone,
  MessageCircle,
  Tag,
  ChevronDown,
  MoreHorizontal,
  ArrowUpDown,
} from 'lucide-react';

const statusOptions = ['all', 'new', 'contacted', 'engaged', 'converted', 'inactive'] as const;

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  engaged: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  converted: 'bg-purple-100 text-purple-700 border-purple-200',
  inactive: 'bg-gray-100 text-gray-600 border-gray-200',
};

const tierColors: Record<string, string> = {
  high: 'bg-gold-100 text-gold-700',
  medium: 'bg-warm-100 text-warm-700',
  unknown: 'bg-gray-100 text-gray-600',
};

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const sources = useMemo(() => {
    const s = new Set(mockContacts.map(c => c.source));
    return ['all', ...Array.from(s)];
  }, []);

  const filteredContacts = useMemo(() => {
    return mockContacts.filter((c) => {
      const matchesSearch = !searchQuery ||
        c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesTier = tierFilter === 'all' || c.financial_tier === tierFilter;
      const matchesSource = sourceFilter === 'all' || c.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesTier && matchesSource;
    });
  }, [searchQuery, statusFilter, tierFilter, sourceFilter]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredContacts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredContacts.map(c => c.id)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Contacts</h1>
          <p className="text-muted-foreground text-sm mt-1">{mockContacts.length} total contacts</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <UserPlus className="w-4 h-4" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {statusOptions.map((status) => {
          const count = status === 'all'
            ? mockContacts.length
            : mockContacts.filter(c => c.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                statusFilter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              )}
            >
              <span className="capitalize">{status}</span>
              <span className="ml-1.5 text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Tiers</option>
          <option value="high">High Value</option>
          <option value="medium">Medium Value</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {sources.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All Sources' : s}</option>
          ))}
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium">{selectedIds.size} selected</span>
          <div className="h-4 w-px bg-border" />
          <button className="text-sm text-primary hover:underline">Assign Agent</button>
          <button className="text-sm text-primary hover:underline">Change Status</button>
          <button className="text-sm text-primary hover:underline">Export</button>
          <button onClick={() => setSelectedIds(new Set())} className="ml-auto text-sm text-muted-foreground hover:text-foreground">
            Clear
          </button>
        </div>
      )}

      {/* Contacts Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="w-10 py-3 px-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filteredContacts.length && filteredContacts.length > 0}
                    onChange={toggleAll}
                    className="rounded border-input"
                  />
                </th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground hidden md:table-cell">Email</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground hidden lg:table-cell">Engagement</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground hidden lg:table-cell">Agent</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground hidden xl:table-cell">Last Contacted</th>
                <th className="w-10 py-3 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className="border-b border-border/50 hover:bg-muted/20 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(contact.id)}
                      onChange={() => toggleSelect(contact.id)}
                      className="rounded border-input"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                        {getInitials(contact.full_name)}
                      </div>
                      <div>
                        <p className="font-medium">{contact.full_name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground hidden md:table-cell">{contact.email}</td>
                  <td className="py-3 px-3">
                    <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border', statusColors[contact.status])}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            contact.engagement_score >= 80 ? 'bg-emerald-500' :
                            contact.engagement_score >= 50 ? 'bg-gold-500' : 'bg-red-400'
                          )}
                          style={{ width: `${contact.engagement_score}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6">{contact.engagement_score}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 hidden lg:table-cell text-muted-foreground">{contact.assigned_agent || '—'}</td>
                  <td className="py-3 px-3 text-muted-foreground text-xs hidden xl:table-cell">
                    {contact.last_contacted ? formatRelativeTime(contact.last_contacted) : 'Never'}
                  </td>
                  <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredContacts.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p className="text-sm">No contacts found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Contact Detail Slide-Over */}
      {selectedContact && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setSelectedContact(null)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card border-l border-border shadow-xl overflow-y-auto animate-slide-in"
            style={{ animationName: 'none', animation: 'slide-in-right 0.3s ease-out' }}
          >
            <div className="p-6">
              {/* Close Button */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Contact Details</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                  {getInitials(selectedContact.full_name)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedContact.full_name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border', statusColors[selectedContact.status])}>
                      {selectedContact.status}
                    </span>
                    {selectedContact.financial_tier && (
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium capitalize', tierColors[selectedContact.financial_tier])}>
                        {selectedContact.financial_tier}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {selectedContact.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedContact.email}</span>
                  </div>
                )}
                {selectedContact.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedContact.phone}</span>
                  </div>
                )}
                {selectedContact.whatsapp && (
                  <div className="flex items-center gap-3 text-sm">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedContact.whatsapp}</span>
                  </div>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground">Engagement Score</p>
                  <p className="text-lg font-bold mt-0.5">{selectedContact.engagement_score}/100</p>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${selectedContact.engagement_score}%` }} />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground">Assigned Agent</p>
                  <p className="text-lg font-bold mt-0.5">{selectedContact.assigned_agent || 'None'}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="text-sm font-medium mt-0.5">{selectedContact.source}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground">Added</p>
                  <p className="text-sm font-medium mt-0.5">{formatDate(selectedContact.created_at)}</p>
                </div>
              </div>

              {/* Tags */}
              {selectedContact.tags.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedContact.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedContact.notes && (
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-2">Notes</p>
                  <p className="text-sm p-3 rounded-lg bg-muted/30">{selectedContact.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  Send Message
                </button>
                <button className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                  Edit Contact
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
