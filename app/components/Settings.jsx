import { useState } from "react";
import { Form } from "@remix-run/react";
import { 
  User, 
  CreditCard, 
  Key, 
  Bell, 
  Moon, 
  Sun, 
  Edit, 
  Plus, 
  Eye, 
  EyeOff,
  Download,
  Check,
  X
} from "lucide-react";

const Settings = ({ userSettings }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showApiKey, setShowApiKey] = useState({});
  
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Moon },
    { id: "api", label: "API Keys", icon: Key },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {userSettings.profile.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{userSettings.profile.name}</h3>
                <p className="text-muted">{userSettings.profile.email}</p>
                <button className="mt-2 text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                  <Edit className="w-3.5 h-3.5" />
                  Change avatar
                </button>
              </div>
            </div>
            
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={userSettings.profile.name}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={userSettings.profile.email}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </Form>
            
            <div className="glass-effect rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Current Plan</h4>
                  <p className="text-sm text-muted mt-1">
                    You are currently on the <span className="text-accent font-medium">Pro Plan</span>
                  </p>
                </div>
                <button className="px-3 py-1.5 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors text-sm">
                  Manage Plan
                </button>
              </div>
            </div>
          </div>
        );
        
      case "preferences":
        return (
          <div className="space-y-6">
            <Form className="space-y-4">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium mb-1">
                  Theme
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 p-3 bg-surface border border-primary rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      defaultChecked={userSettings.preferences.theme === "dark"}
                      className="sr-only"
                    />
                    <Moon className="w-5 h-5" />
                    <span>Dark</span>
                    <Check className="w-4 h-4 text-primary ml-2" />
                  </label>
                  
                  <label className="flex items-center gap-2 p-3 bg-surface border border-border rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      defaultChecked={userSettings.preferences.theme === "light"}
                      className="sr-only"
                    />
                    <Sun className="w-5 h-5" />
                    <span>Light</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="editorFontSize" className="block text-sm font-medium mb-1">
                  Editor Font Size
                </label>
                <select
                  id="editorFontSize"
                  name="editorFontSize"
                  defaultValue={userSettings.preferences.editorFontSize}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="editorTabSize" className="block text-sm font-medium mb-1">
                  Tab Size
                </label>
                <select
                  id="editorTabSize"
                  name="editorTabSize"
                  defaultValue={userSettings.preferences.editorTabSize}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                </select>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="autoSave"
                  name="autoSave"
                  defaultChecked={userSettings.preferences.autoSave}
                  className="w-4 h-4 bg-surface border border-border rounded focus:ring-primary"
                />
                <label htmlFor="autoSave" className="text-sm">
                  Enable auto-save
                </label>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </Form>
          </div>
        );
        
      case "api":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">API Keys</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm">
                <Plus className="w-4 h-4" />
                Add New Key
              </button>
            </div>
            
            <div className="space-y-4">
              {userSettings.apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="glass-effect rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{apiKey.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="font-mono text-sm bg-surface px-3 py-1.5 rounded border border-border">
                          {showApiKey[apiKey.id] ? "api_key_example_value" : apiKey.key}
                        </div>
                        <button
                          onClick={() => setShowApiKey(prev => ({ ...prev, [apiKey.id]: !prev[apiKey.id] }))}
                          className="p-1.5 hover:bg-surface rounded-md transition-colors"
                          aria-label={showApiKey[apiKey.id] ? "Hide API key" : "Show API key"}
                        >
                          {showApiKey[apiKey.id] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                        <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
                        <span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-surface rounded-md transition-colors text-red-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case "billing":
        return (
          <div className="space-y-6">
            <div className="glass-effect rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Current Plan</h4>
                  <p className="text-sm text-muted mt-1">
                    You are currently on the <span className="text-accent font-medium">{userSettings.billing.plan} Plan</span> ({userSettings.billing.amount}/{userSettings.billing.interval})
                  </p>
                </div>
                <button className="px-3 py-1.5 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors text-sm">
                  Change Plan
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Payment Method</h4>
              <div className="glass-effect rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface rounded-md flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• {userSettings.billing.paymentMethod.last4}</p>
                    <p className="text-sm text-muted">Expires {userSettings.billing.paymentMethod.expiry}</p>
                  </div>
                </div>
                <button className="text-sm text-primary hover:text-primary/80">
                  Update
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Billing History</h4>
              <div className="glass-effect rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userSettings.billing.invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 text-sm">{invoice.date}</td>
                        <td className="px-4 py-3 text-sm">{invoice.amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button className="text-primary hover:text-primary/80 flex items-center gap-1">
                            <Download className="w-3.5 h-3.5" />
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case "notifications":
        return (
          <div className="space-y-6">
            <Form className="space-y-4">
              <h3 className="text-lg font-semibold">Notification Preferences</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface rounded-md">
                  <div>
                    <h4 className="font-medium">Deployment Notifications</h4>
                    <p className="text-sm text-muted">Get notified when your deployments succeed or fail</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      defaultChecked={userSettings.preferences.notifications.deployments}
                    />
                    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-surface rounded-md">
                  <div>
                    <h4 className="font-medium">Update Notifications</h4>
                    <p className="text-sm text-muted">Get notified about new features and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      defaultChecked={userSettings.preferences.notifications.updates}
                    />
                    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-surface rounded-md">
                  <div>
                    <h4 className="font-medium">Newsletter</h4>
                    <p className="text-sm text-muted">Receive our monthly newsletter with tips and tutorials</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      defaultChecked={userSettings.preferences.notifications.newsletter}
                    />
                    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Save Notification Settings
                </button>
              </div>
            </Form>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-muted hover:text-text hover:bg-surface'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="glass-effect rounded-lg p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

