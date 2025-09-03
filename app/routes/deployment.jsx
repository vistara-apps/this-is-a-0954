import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";
import DeploymentPanel from "~/components/DeploymentPanel";

export const meta = () => {
  return [
    { title: "AnimeForge | Deployment" },
    { name: "description", content: "Deploy your Remix anime website to various platforms." },
  ];
};

export const loader = async () => {
  // In a real app, we would fetch deployment data from a database or API
  const deploymentOptions = [
    {
      id: "vercel",
      name: "Vercel",
      description: "Deploy to Vercel for serverless hosting with global CDN.",
      logo: "/images/platforms/vercel.svg",
      isPopular: true,
      steps: [
        "Connect your GitHub repository to Vercel",
        "Select the repository containing your AnimeForge project",
        "Configure build settings (defaults work for most projects)",
        "Deploy your site"
      ]
    },
    {
      id: "netlify",
      name: "Netlify",
      description: "Deploy to Netlify for continuous deployment and serverless functions.",
      logo: "/images/platforms/netlify.svg",
      isPopular: true,
      steps: [
        "Connect your GitHub repository to Netlify",
        "Select the repository containing your AnimeForge project",
        "Configure build settings (Build command: 'npm run build', Publish directory: 'public')",
        "Deploy your site"
      ]
    },
    {
      id: "flyio",
      name: "Fly.io",
      description: "Deploy to Fly.io for global application deployment close to your users.",
      logo: "/images/platforms/flyio.svg",
      isPopular: false,
      steps: [
        "Install the Fly CLI: 'curl -L https://fly.io/install.sh | sh'",
        "Authenticate: 'fly auth login'",
        "Launch your app: 'fly launch'",
        "Deploy your app: 'fly deploy'"
      ]
    },
    {
      id: "railway",
      name: "Railway",
      description: "Deploy to Railway for simple infrastructure and deployment.",
      logo: "/images/platforms/railway.svg",
      isPopular: false,
      steps: [
        "Connect your GitHub repository to Railway",
        "Create a new project from your repository",
        "Configure environment variables if needed",
        "Deploy your site"
      ]
    },
    {
      id: "render",
      name: "Render",
      description: "Deploy to Render for easy cloud hosting with free SSL.",
      logo: "/images/platforms/render.svg",
      isPopular: false,
      steps: [
        "Connect your GitHub repository to Render",
        "Create a new Web Service",
        "Select your repository and configure build settings",
        "Deploy your site"
      ]
    },
    {
      id: "custom",
      name: "Custom Server",
      description: "Deploy to your own server or VPS for complete control.",
      logo: "/images/platforms/server.svg",
      isPopular: false,
      steps: [
        "Build your app: 'npm run build'",
        "Install PM2: 'npm install -g pm2'",
        "Start your app: 'pm2 start npm --name \"animeforge\" -- start'",
        "Configure Nginx or Apache as a reverse proxy"
      ]
    }
  ];

  const deploymentHistory = [
    {
      id: 1,
      projectName: "Otaku Central",
      platform: "Vercel",
      status: "success",
      url: "otaku-central.vercel.app",
      deployedAt: "2023-08-15T14:30:00Z"
    },
    {
      id: 2,
      projectName: "Anime Reviews",
      platform: "Netlify",
      status: "building",
      url: "anime-reviews.netlify.app",
      deployedAt: "2023-08-15T15:45:00Z"
    },
    {
      id: 3,
      projectName: "Seasonal Watch",
      platform: "Vercel",
      status: "failed",
      url: null,
      deployedAt: "2023-08-14T10:20:00Z",
      error: "Build failed: Missing environment variables"
    }
  ];

  return json({ deploymentOptions, deploymentHistory });
};

export default function Deployment() {
  const { deploymentOptions, deploymentHistory } = useLoaderData();
  
  return (
    <div className="min-h-screen bg-bg text-text flex">
      <Sidebar activeView="deployment" />
      <main className="flex-1 ml-64">
        <DeploymentPanel 
          deploymentOptions={deploymentOptions} 
          deploymentHistory={deploymentHistory} 
        />
      </main>
    </div>
  );
}

