import { useState } from "react";
import { User, Bell, Shield, Database, Save } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <nav className="space-y-1">
              <SettingsTab 
                id="profile" 
                label="Profile" 
                icon={<User size={18} />} 
                active={activeTab === "profile"} 
                onClick={() => setActiveTab("profile")} 
              />
              <SettingsTab 
                id="notifications" 
                label="Notifications" 
                icon={<Bell size={18} />} 
                active={activeTab === "notifications"} 
                onClick={() => setActiveTab("notifications")} 
              />
              <SettingsTab 
                id="security" 
                label="Security" 
                icon={<Shield size={18} />} 
                active={activeTab === "security"} 
                onClick={() => setActiveTab("security")} 
              />
              <SettingsTab 
                id="api" 
                label="API Keys" 
                icon={<Database size={18} />} 
                active={activeTab === "api"} 
                onClick={() => setActiveTab("api")} 
              />
            </nav>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="card">
            {activeTab === "profile" && <ProfileSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "api" && <ApiSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ id, label, icon, active, onClick }) {
  return (
    <button 
      className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
        active 
          ? "bg-blue-50 text-blue-700" 
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className={`mr-2 ${active ? "text-blue-500" : "text-gray-500"}`}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}

function ProfileSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <User size={32} className="text-gray-500" />
        </div>
        <div>
          <button className="btn-secondary text-sm">Change Avatar</button>
          <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input 
              type="text" 
              className="input w-full" 
              defaultValue="animefan123"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              type="email" 
              className="input w-full" 
              defaultValue="user@example.com"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea 
            className="input w-full h-24" 
            defaultValue="Anime enthusiast and web developer."
          />
        </div>
        
        <div className="pt-4">
          <button className="btn-primary flex items-center">
            <Save size={16} className="mr-1" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
      
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="font-medium mb-2">Email Notifications</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">
                Deployment notifications
              </label>
              <input type="checkbox" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">
                Security alerts
              </label>
              <input type="checkbox" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">
                Newsletter and updates
              </label>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">In-App Notifications</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">
                New template alerts
              </label>
              <input type="checkbox" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">
                Deployment status changes
              </label>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button className="btn-primary flex items-center">
            <Save size={16} className="mr-1" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Security Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Change Password</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input 
                type="password" 
                className="input w-full" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input 
                type="password" 
                className="input w-full" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input 
                type="password" 
                className="input w-full" 
              />
            </div>
          </div>
          
          <button className="btn-primary mt-3">
            Update Password
          </button>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
          
          <p className="text-sm text-gray-600 mb-3">
            Add an extra layer of security to your account by enabling two-factor authentication.
          </p>
          
          <button className="btn-secondary">
            Enable 2FA
          </button>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Sessions</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-sm text-gray-500">Chrome on Windows • IP: 192.168.1.1</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
              <div>
                <p className="font-medium">Mobile Session</p>
                <p className="text-sm text-gray-500">Safari on iPhone • IP: 192.168.1.2</p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-800">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">API Keys</h2>
      
      <p className="text-sm text-gray-600 mb-4">
        Manage your API keys for integrating with external services.
      </p>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">AniList API</h3>
          
          <div className="flex">
            <input 
              type="password" 
              className="input rounded-r-none flex-grow" 
              defaultValue="anilist_api_key_12345"
              readOnly
            />
            <button className="btn-secondary rounded-l-none border-l-0">
              Show
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Used for fetching anime data from AniList GraphQL API.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Jikan API</h3>
          
          <div className="flex">
            <input 
              type="password" 
              className="input rounded-r-none flex-grow" 
              defaultValue="jikan_api_key_67890"
              readOnly
            />
            <button className="btn-secondary rounded-l-none border-l-0">
              Show
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Fallback API for MyAnimeList data.
          </p>
        </div>
        
        <div className="pt-4">
          <button className="btn-primary">
            Generate New API Key
          </button>
        </div>
      </div>
    </div>
  );
}

