import React, { useState } from 'react';
import { 
  TrendingUp, 
  Download, 
  Star, 
  Users, 
  Clock,
  Plus,
  ExternalLink,
  Activity
} from 'lucide-react';
import StatsCard from './StatsCard';
import ProjectCard from './ProjectCard';

const Dashboard = () => {
  const [projects] = useState([
    {
      id: 1,
      name: 'Otaku Central',
      status: 'deployed',
      url: 'otaku-central.vercel.app',
      lastUpdate: '2 hours ago',
      template: 'Modern Anime',
      views: '1.2k'
    },
    {
      id: 2,
      name: 'Anime Reviews',
      status: 'building',
      url: 'anime-reviews.netlify.app',
      lastUpdate: '30 minutes ago',
      template: 'Review Hub',
      views: '856'
    },
    {
      id: 3,
      name: 'Seasonal Watch',
      status: 'draft',
      url: null,
      lastUpdate: '1 day ago',
      template: 'Seasonal Tracker',
      views: '0'
    }
  ]);

  const stats = [
    { title: 'Active Projects', value: '3', icon: Activity, change: '+12%' },
    { title: 'Total Deployments', value: '25', icon: TrendingUp, change: '+8%' },
    { title: 'Template Downloads', value: '1.2k', icon: Download, change: '+24%' },
    { title: 'Community Stars', value: '4.8k', icon: Star, change: '+18%' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back!</h1>
          <p className="text-muted">Here's what's happening with your anime projects.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            View all
          </button>
        </div>
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-effect rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Start</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 bg-bg hover:bg-border rounded-md transition-colors text-left">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Download className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Download Boilerplate</p>
                <p className="text-xs text-muted">Get the latest Remix template</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-bg hover:bg-border rounded-md transition-colors text-left">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Deployment Guide</p>
                <p className="text-xs text-muted">Step-by-step instructions</p>
              </div>
            </button>
          </div>
        </div>

        <div className="glass-effect rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-muted" />
              <span className="text-sm">2.4k active developers</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-muted" />
              <span className="text-sm">Last updated 2 hours ago</span>
            </div>
            <button className="text-primary hover:text-primary/80 text-sm font-medium">
              Join Discord →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;