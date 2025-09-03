import { useState } from "react";
import { Globe, Server, ArrowRight, Check, AlertCircle } from "lucide-react";

export default function DeploymentPanel() {
  const [deploymentStatus, setDeploymentStatus] = useState("idle"); // idle, deploying, success, error
  
  const handleDeploy = () => {
    setDeploymentStatus("deploying");
    
    // Simulate deployment process
    setTimeout(() => {
      setDeploymentStatus("success");
    }, 2000);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Deployment</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center mb-4">
            <Server size={24} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-bold">Deployment Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input 
                type="text" 
                className="input w-full" 
                defaultValue="my-anime-website"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deployment Platform
              </label>
              <select className="input w-full">
                <option>Vercel</option>
                <option>Netlify</option>
                <option>GitHub Pages</option>
                <option>Custom Server</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Environment
              </label>
              <div className="flex space-x-2">
                <button className="btn-primary">Production</button>
                <button className="btn-secondary">Preview</button>
                <button className="btn-secondary">Development</button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Build Command
              </label>
              <input 
                type="text" 
                className="input w-full" 
                defaultValue="npm run build"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Output Directory
              </label>
              <input 
                type="text" 
                className="input w-full" 
                defaultValue="build"
              />
            </div>
            
            <button 
              className={`btn-primary w-full flex justify-center items-center ${deploymentStatus === 'deploying' ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={handleDeploy}
              disabled={deploymentStatus === 'deploying'}
            >
              {deploymentStatus === 'deploying' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deploying...
                </>
              ) : (
                <>Deploy Now</>
              )}
            </button>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center mb-4">
            <Globe size={24} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-bold">Deployment History</h2>
          </div>
          
          <div className="space-y-3">
            {deploymentStatus === 'success' && (
              <DeploymentItem 
                status="success" 
                environment="Production" 
                timestamp="Just now" 
                url="https://my-anime-website.vercel.app" 
              />
            )}
            
            <DeploymentItem 
              status="success" 
              environment="Production" 
              timestamp="2 days ago" 
              url="https://my-anime-website.vercel.app" 
            />
            
            <DeploymentItem 
              status="error" 
              environment="Preview" 
              timestamp="3 days ago" 
              error="Build failed: Missing dependencies" 
            />
            
            <DeploymentItem 
              status="success" 
              environment="Production" 
              timestamp="1 week ago" 
              url="https://my-anime-website.vercel.app" 
            />
          </div>
          
          <button className="text-blue-600 flex items-center mt-4 hover:underline">
            View all deployments <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DeploymentItem({ status, environment, timestamp, url, error }) {
  return (
    <div className="border border-gray-200 rounded-md p-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            {status === 'success' ? (
              <Check size={16} className="text-green-500 mr-1" />
            ) : (
              <AlertCircle size={16} className="text-red-500 mr-1" />
            )}
            <span className={`font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {status === 'success' ? 'Successful' : 'Failed'}
            </span>
            <span className="ml-2 text-sm text-gray-500">{environment}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{timestamp}</p>
        </div>
        
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 text-sm hover:underline"
          >
            Visit
          </a>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}

