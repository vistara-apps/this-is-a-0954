import { Link } from "@remix-run/react";
import { ArrowRight, Star, Users, Code } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to AnimeForge</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Projects" 
          value="3" 
          description="Active projects" 
          icon={<Code className="text-blue-500" />} 
        />
        <StatCard 
          title="Templates" 
          value="24" 
          description="Available templates" 
          icon={<Star className="text-yellow-500" />} 
        />
        <StatCard 
          title="Community" 
          value="1.2k" 
          description="Active users" 
          icon={<Users className="text-green-500" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
          <div className="space-y-3">
            <ProjectItem name="My Anime Blog" lastEdited="2 days ago" />
            <ProjectItem name="Anime Watchlist App" lastEdited="1 week ago" />
            <ProjectItem name="Manga Reader" lastEdited="3 weeks ago" />
          </div>
          <Link to="/templates" className="flex items-center text-blue-600 mt-4 hover:underline">
            Create new project <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Featured Templates</h2>
          <div className="space-y-3">
            <TemplateItem name="Anime Blog" category="Content" isPremium={false} />
            <TemplateItem name="Anime Tracker Pro" category="Application" isPremium={true} />
            <TemplateItem name="Manga Collection" category="Portfolio" isPremium={false} />
          </div>
          <Link to="/templates" className="flex items-center text-blue-600 mt-4 hover:underline">
            View all templates <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, description, icon }) {
  return (
    <div className="card flex items-center">
      <div className="p-3 rounded-full bg-gray-100 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
}

function ProjectItem({ name, lastEdited }) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-gray-500 text-sm">Last edited: {lastEdited}</p>
      </div>
      <Link to="/editor" className="text-blue-600 hover:text-blue-800">
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

function TemplateItem({ name, category, isPremium }) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-gray-500 text-sm">{category}</p>
      </div>
      <div className="flex items-center">
        {isPremium && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mr-2">
            Premium
          </span>
        )}
        <Link to="/templates" className="text-blue-600 hover:text-blue-800">
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

