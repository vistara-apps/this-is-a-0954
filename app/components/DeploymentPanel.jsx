import { useState } from "react";
import { Link } from "@remix-run/react";
import { 
  ExternalLink, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ChevronRight,
  Fire
} from "lucide-react";

const DeploymentPanel = ({ deploymentOptions, deploymentHistory }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  
  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "building":
        return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).format(date);
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Deployment</h1>
        <p className="text-muted">Deploy your Remix anime website to various platforms.</p>
      </div>
      
      {/* Deployment History */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Deployments</h2>
        <div className="glass-effect rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium">Project</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Platform</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Deployed</th>
                <th className="px-4 py-3 text-left text-sm font-medium">URL</th>
              </tr>
            </thead>
            <tbody>
              {deploymentHistory.map((deployment) => (
                <tr key={deployment.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-sm">{deployment.projectName}</td>
                  <td className="px-4 py-3 text-sm">{deployment.platform}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(deployment.status)}
                      <span className="capitalize">{deployment.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(deployment.deployedAt)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {deployment.url ? (
                      <a 
                        href={`https://${deployment.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        {deployment.url}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Deployment Options */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Deploy Your Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deploymentOptions.map((platform) => (
            <div 
              key={platform.id}
              className={`glass-effect rounded-lg p-4 cursor-pointer transition-all ${
                selectedPlatform === platform.id 
                  ? "ring-2 ring-primary" 
                  : "hover:bg-surface/50"
              }`}
              onClick={() => setSelectedPlatform(platform.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* In a real app, we would display the platform logo here */}
                  <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                    {platform.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{platform.name}</h3>
                      {platform.isPopular && (
                        <span className="bg-accent/20 text-accent px-1.5 py-0.5 rounded-full text-xs flex items-center gap-1">
                          <Fire className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted mt-1">{platform.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selected Platform Details */}
      {selectedPlatform && (
        <div className="glass-effect rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">
            Deploy to {deploymentOptions.find(p => p.id === selectedPlatform)?.name}
          </h3>
          
          <div className="space-y-4">
            <h4 className="font-medium">Deployment Steps</h4>
            <ol className="space-y-3">
              {deploymentOptions
                .find(p => p.id === selectedPlatform)
                ?.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm">{step}</p>
                  </li>
                ))}
            </ol>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Link
              to={`/guides/deployment/${selectedPlatform}`}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
            >
              View detailed guide
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentPanel;

