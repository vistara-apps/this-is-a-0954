import React, { useState } from 'react';
import { 
  Rocket, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  ExternalLink,
  Settings,
  Globe,
  Database,
  Zap
} from 'lucide-react';

const DeploymentPanel = () => {
  const [deployments] = useState([
    {
      id: 1,
      name: 'Otaku Central',
      status: 'success',
      url: 'otaku-central.vercel.app',
      platform: 'Vercel',
      deployedAt: '2 hours ago',
      buildTime: '2m 34s',
      commits: 'feat: add episode tracker'
    },
    {
      id: 2,
      name: 'Anime Reviews',
      status: 'building',
      url: 'anime-reviews.netlify.app',
      platform: 'Netlify',
      deployedAt: 'Building...',
      buildTime: '1m 12s',
      commits: 'fix: responsive design issues'
    },
    {
      id: 3,
      name: 'Seasonal Watch',
      status: 'failed',
      url: null,
      platform: 'Cloudflare',
      deployedAt: '1 day ago',
      buildTime: '45s',
      commits: 'update: dependency versions'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'building':
        return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/20 text-green-400';
      case 'building':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Deployments</h1>
          <p className="text-muted">Manage and monitor your anime website deployments.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
          <Rocket className="w-4 h-4" />
          New Deployment
        </button>
      </div>

      {/* Deployment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-effect rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold">25</p>
              <p className="text-muted text-sm">Successful Deploys</p>
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">1.2s</p>
              <p className="text-muted text-sm">Avg Build Time</p>
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold">99.9%</p>
              <p className="text-muted text-sm">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Deployments */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Deployments</h2>
        <div className="space-y-3">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="glass-effect rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(deployment.status)}
                  <div>
                    <h3 className="font-medium">{deployment.name}</h3>
                    <p className="text-sm text-muted">{deployment.commits}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm">{deployment.platform}</p>
                    <p className="text-xs text-muted">{deployment.deployedAt}</p>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(deployment.status)}`}>
                    {deployment.status}
                  </span>
                  
                  {deployment.url && (
                    <button className="p-2 hover:bg-bg rounded-md transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button className="p-2 hover:bg-bg rounded-md transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted">Build Time:</span>
                  <span className="ml-2">{deployment.buildTime}</span>
                </div>
                <div>
                  <span className="text-muted">Platform:</span>
                  <span className="ml-2">{deployment.platform}</span>
                </div>
                {deployment.url && (
                  <div>
                    <span className="text-muted">URL:</span>
                    <span className="ml-2 text-primary">{deployment.url}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Integration */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Platform Integration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Vercel', 'Netlify', 'Cloudflare'].map((platform) => (
            <div key={platform} className="glass-effect rounded-lg p-4 hover:bg-border/20 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Database className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{platform}</span>
                </div>
                <span className="text-xs text-green-400">Connected</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeploymentPanel;