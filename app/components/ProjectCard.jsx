import { Link } from "@remix-run/react";
import { ExternalLink, Clock, Eye, MoreHorizontal } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-500/20 text-green-400';
      case 'building':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'draft':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="glass-effect rounded-lg p-4 hover:bg-border/20 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">{project.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
          <p className="text-muted text-sm mt-1">Template: {project.template}</p>
          
          <div className="flex items-center gap-4 mt-3 text-sm text-muted">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {project.lastUpdate}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {project.views} views
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {project.url && (
            <a 
              href={`https://${project.url}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:bg-bg rounded-md transition-colors"
              aria-label={`Visit ${project.name}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <Link 
            to={`/projects/${project.id}`}
            className="p-2 hover:bg-bg rounded-md transition-colors"
            aria-label={`Manage ${project.name}`}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

