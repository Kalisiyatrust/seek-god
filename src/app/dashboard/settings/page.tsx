'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Settings,
  Bell,
  Key,
  Plug,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Globe,
  Palette,
  Mail,
  MessageCircle,
  Smartphone,
} from 'lucide-react';

type TabId = 'general' | 'notifications' | 'api-keys' | 'integrations';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'general', label: 'General', icon: <Settings className="w-4 h-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  { id: 'api-keys', label: 'API Keys', icon: <Key className="w-4 h-4" /> },
  { id: 'integrations', label: 'Integrations', icon: <Plug className="w-4 h-4" /> },
];

interface ApiKey {
  name: string;
  key: string;
  visible: boolean;
}

interface Integration {
  name: string;
  description: string;
  connected: boolean;
  icon: React.ReactNode;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('general');

  // General settings
  const [platformName, setPlatformName] = useState('Seek God');
  const [platformDescription, setPlatformDescription] = useState('A platform for discovering life purpose, meaningful giving, and spiritual growth through AI-guided conversations.');
  const [primaryColor, setPrimaryColor] = useState('#D4A017');

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [whatsappNotifs, setWhatsappNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [newContactAlert, setNewContactAlert] = useState(true);
  const [conversionAlert, setConversionAlert] = useState(true);

  // API Keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { name: 'OpenAI', key: 'sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', visible: false },
    { name: 'Twilio', key: 'AC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', visible: false },
    { name: 'SendGrid', key: 'SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', visible: false },
    { name: 'WhatsApp Business', key: 'whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', visible: false },
  ]);

  // Integrations
  const [integrations] = useState<Integration[]>([
    { name: 'OpenAI GPT-4', description: 'Powers AI agent conversations and content generation', connected: true, icon: <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">AI</div> },
    { name: 'Twilio', description: 'SMS messaging and phone number verification', connected: true, icon: <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-sm font-bold text-red-600">TW</div> },
    { name: 'SendGrid', description: 'Email delivery and campaign management', connected: true, icon: <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">SG</div> },
    { name: 'WhatsApp Business', description: 'WhatsApp messaging via official Business API', connected: false, icon: <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-sm font-bold text-green-600">WA</div> },
    { name: 'Supabase', description: 'Database, authentication, and real-time subscriptions', connected: true, icon: <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-600">SB</div> },
    { name: 'Stripe', description: 'Payment processing for donations', connected: false, icon: <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-sm font-bold text-purple-600">ST</div> },
  ]);

  const toggleKeyVisibility = (index: number) => {
    setApiKeys(prev => prev.map((k, i) => i === index ? { ...k, visible: !k.visible } : k));
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={cn(
        'relative w-10 rounded-full transition-colors',
        checked ? 'bg-primary' : 'bg-gray-300'
      )}
      style={{ width: '40px', height: '22px' }}
    >
      <span
        className={cn(
          'absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-[20px]' : 'translate-x-0.5'
        )}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your platform configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Platform Name</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <textarea
                value={platformDescription}
                onChange={(e) => setPlatformDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Primary Brand Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-input cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-32 h-10 px-3 rounded-lg border border-input bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: primaryColor }} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Platform URL</label>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value="seekgod.com"
                  readOnly
                  className="flex-1 h-10 px-3 rounded-lg border border-input bg-muted text-sm text-muted-foreground"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            <div className="p-5">
              <h3 className="font-semibold mb-1">Notification Channels</h3>
              <p className="text-sm text-muted-foreground">Choose how you receive notifications</p>
            </div>

            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Mail className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Toggle checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
            </div>

            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                  <MessageCircle className="w-4.5 h-4.5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">WhatsApp Notifications</p>
                  <p className="text-xs text-muted-foreground">Get alerts on WhatsApp</p>
                </div>
              </div>
              <Toggle checked={whatsappNotifs} onChange={() => setWhatsappNotifs(!whatsappNotifs)} />
            </div>

            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Smartphone className="w-4.5 h-4.5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">SMS Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive text message alerts</p>
                </div>
              </div>
              <Toggle checked={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            <div className="p-5">
              <h3 className="font-semibold mb-1">Alert Preferences</h3>
              <p className="text-sm text-muted-foreground">Configure which events trigger notifications</p>
            </div>

            <div className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium">Daily Digest</p>
                <p className="text-xs text-muted-foreground">Summary of daily activity sent each morning</p>
              </div>
              <Toggle checked={dailyDigest} onChange={() => setDailyDigest(!dailyDigest)} />
            </div>

            <div className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium">New Contact Alerts</p>
                <p className="text-xs text-muted-foreground">Notify when new contacts are added</p>
              </div>
              <Toggle checked={newContactAlert} onChange={() => setNewContactAlert(!newContactAlert)} />
            </div>

            <div className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium">Conversion Alerts</p>
                <p className="text-xs text-muted-foreground">Notify when a contact converts</p>
              </div>
              <Toggle checked={conversionAlert} onChange={() => setConversionAlert(!conversionAlert)} />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              <Save className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === 'api-keys' && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            <div className="p-5">
              <h3 className="font-semibold mb-1">API Keys</h3>
              <p className="text-sm text-muted-foreground">Manage API keys for third-party integrations</p>
            </div>

            {apiKeys.map((apiKey, i) => (
              <div key={apiKey.name} className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">{apiKey.name}</label>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type={apiKey.visible ? 'text' : 'password'}
                      value={apiKey.key}
                      readOnly
                      className="w-full h-10 px-3 pr-10 rounded-lg border border-input bg-muted text-sm font-mono focus:outline-none"
                    />
                    <button
                      onClick={() => toggleKeyVisibility(i)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-background"
                    >
                      {apiKey.visible ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  </div>
                  <button className="px-3 h-10 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-800">
              <strong>Security Notice:</strong> API keys are stored encrypted. Never share your API keys publicly. Rotate keys periodically for best security practices.
            </p>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="max-w-2xl space-y-4">
          {integrations.map((integration) => (
            <div key={integration.name} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-4">
                {integration.icon}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{integration.name}</h3>
                    <span className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                      integration.connected
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600'
                    )}>
                      {integration.connected ? (
                        <><CheckCircle2 className="w-3 h-3" /> Connected</>
                      ) : (
                        <><XCircle className="w-3 h-3" /> Disconnected</>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{integration.description}</p>
                </div>
                <button className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  integration.connected
                    ? 'border border-border hover:bg-muted text-muted-foreground'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                )}>
                  {integration.connected ? (
                    <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> Reconnect</span>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
