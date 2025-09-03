import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download,
  Key,
  Globe,
  Save
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    darkMode: true,
    apiKey: 'ak_****************************',
    language: 'en',
    timezone: 'UTC'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  defaultValue="developer"
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="developer@animeforge.dev"
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                rows={3}
                defaultValue="Passionate anime fan and web developer building amazing anime websites with Remix."
                className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-4">
            {[
              { key: 'deployments', label: 'Deployment notifications', desc: 'Get notified when deployments complete' },
              { key: 'updates', label: 'Template updates', desc: 'New templates and features' },
              { key: 'community', label: 'Community activity', desc: 'Comments and stars on your projects' },
              { key: 'marketing', label: 'Marketing emails', desc: 'Product updates and tips' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
              <p className="text-muted mb-4">Add an extra layer of security to your account.</p>
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
        );
        
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Theme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 cursor-pointer hover:bg-border/20 transition-colors bg-primary/10">
                  <div className="w-full h-20 bg-gradient-to-r from-bg to-surface rounded mb-3"></div>
                  <p className="font-medium">Dark Theme</p>
                  <p className="text-sm text-muted">Default dark interface</p>
                </div>
                <div className="border border-border rounded-lg p-4 cursor-pointer hover:bg-border/20 transition-colors">
                  <div className="w-full h-20 bg-gradient-to-r from-gray-100 to-white rounded mb-3"></div>
                  <p className="font-medium">Light Theme</p>
                  <p className="text-sm text-muted">Clean light interface</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Accent Color</h3>
              <div className="flex gap-3">
                {['hsl(240 85% 50%)', 'hsl(340 80% 55%)', 'hsl(160 80% 45%)', 'hsl(30 90% 55%)'].map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border-2 border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">API Keys</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <p className="font-medium">AnimeForge API Key</p>
                    <p className="text-sm text-muted font-mono">{settings.apiKey}</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-bg border border-border rounded hover:bg-border/20 transition-colors">
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">External APIs</h3>
              <div className="space-y-3">
                {['AniList API', 'MyAnimeList API', 'Kitsu API'].map((api) => (
                  <div key={api} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span>{api}</span>
                    <button className="text-primary hover:text-primary/80 text-sm">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-muted hover:text-text hover:bg-surface'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="glass-effect rounded-lg p-6">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="flex justify-end pt-6 mt-6 border-t border-border">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;