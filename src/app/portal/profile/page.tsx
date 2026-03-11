'use client';

import { useState } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Donation } from '@/types';
import { motion } from 'framer-motion';
import {
  Camera,
  Save,
  Calendar,
  BookOpen,
  ClipboardCheck,
  Mail,
  MessageCircle,
  Smartphone,
  AlertTriangle,
  Trash2,
} from 'lucide-react';

const mockDonations: Donation[] = [
  { id: 'd1', donor_id: '1', amount: 250, currency: 'GBP', cause: 'Children\'s Education', status: 'completed', payment_method: 'Card', created_at: '2026-03-01T10:00:00Z' },
  { id: 'd2', donor_id: '1', amount: 100, currency: 'GBP', cause: 'Community Gardens', status: 'completed', payment_method: 'Card', created_at: '2026-02-15T10:00:00Z' },
  { id: 'd3', donor_id: '1', amount: 500, currency: 'GBP', cause: 'Healthcare Initiative', status: 'completed', payment_method: 'Bank Transfer', created_at: '2026-01-20T10:00:00Z' },
  { id: 'd4', donor_id: '1', amount: 75, currency: 'GBP', cause: 'Food Bank Support', status: 'pending', payment_method: 'Card', created_at: '2026-03-10T10:00:00Z' },
];

export default function ProfilePage() {
  const [name, setName] = useState('James Robertson');
  const [email, setEmail] = useState('james.r@example.com');
  const [phone, setPhone] = useState('+44 7700 900001');
  const [bio, setBio] = useState('CEO exploring purpose beyond professional success. Interested in philanthropy and community impact.');
  const [emailNotif, setEmailNotif] = useState(true);
  const [whatsappNotif, setWhatsappNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={cn('relative w-10 rounded-full transition-colors', checked ? 'bg-primary' : 'bg-gray-300')}
      style={{ width: '40px', height: '22px' }}
    >
      <span className={cn('absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform', checked ? 'translate-x-[20px]' : 'translate-x-0.5')} />
    </button>
  );

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Avatar & Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">JR</span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-card border border-border shadow flex items-center justify-center hover:bg-muted transition-colors">
              <Camera className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">Member since Jan 2026</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex justify-end">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </motion.div>

      {/* Journey Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">54</p>
          <p className="text-xs text-muted-foreground">Days Active</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <BookOpen className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-muted-foreground">Content Consumed</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <ClipboardCheck className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">2</p>
          <p className="text-xs text-muted-foreground">Assessments</p>
        </div>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card border border-border rounded-xl divide-y divide-border"
      >
        <div className="p-5">
          <h3 className="font-semibold">Notification Preferences</h3>
        </div>
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted-foreground">Receive updates via email</p>
            </div>
          </div>
          <Toggle checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
        </div>
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">WhatsApp</p>
              <p className="text-xs text-muted-foreground">Get messages on WhatsApp</p>
            </div>
          </div>
          <Toggle checked={whatsappNotif} onChange={() => setWhatsappNotif(!whatsappNotif)} />
        </div>
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <Smartphone className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">SMS</p>
              <p className="text-xs text-muted-foreground">Receive text notifications</p>
            </div>
          </div>
          <Toggle checked={smsNotif} onChange={() => setSmsNotif(!smsNotif)} />
        </div>
      </motion.div>

      {/* Donation History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        <h3 className="font-semibold mb-4">Donation History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Cause</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockDonations.map(donation => (
                <tr key={donation.id} className="border-b border-border/50">
                  <td className="py-2.5 text-muted-foreground">{formatDate(donation.created_at)}</td>
                  <td className="py-2.5">{donation.cause}</td>
                  <td className="py-2.5 font-medium">&pound;{donation.amount.toLocaleString()}</td>
                  <td className="py-2.5">
                    <span className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      donation.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      donation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    )}>
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Total donated: &pound;{mockDonations.filter(d => d.status === 'completed').reduce((s, d) => s + d.amount, 0).toLocaleString()}
        </p>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="border border-destructive/30 rounded-xl p-5"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-destructive">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-destructive text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
