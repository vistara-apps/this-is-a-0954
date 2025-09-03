import { Link } from "@remix-run/react";
import { Home, Code, Settings, Package, CreditCard, Layout } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">AnimeForge</h1>
        <p className="text-gray-400 text-sm">Build your anime website</p>
      </div>
      
      <nav className="space-y-2">
        <SidebarLink to="/" icon={<Home size={20} />} label="Dashboard" />
        <SidebarLink to="/editor" icon={<Code size={20} />} label="Code Editor" />
        <SidebarLink to="/templates" icon={<Layout size={20} />} label="Templates" />
        <SidebarLink to="/deployment" icon={<Package size={20} />} label="Deployment" />
        <SidebarLink to="/subscription" icon={<CreditCard size={20} />} label="Subscription" />
        <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" />
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-blue-600 rounded-md p-3 text-center">
          <p className="text-sm font-medium">Free Plan</p>
          <Link to="/subscription" className="text-xs text-blue-200 hover:text-white">
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label }) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

