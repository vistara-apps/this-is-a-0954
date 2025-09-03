import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";
import Dashboard from "~/components/Dashboard";

export const meta = () => {
  return [
    { title: "AnimeForge | Dashboard" },
    { name: "description", content: "Launch your dream anime website in minutes with Remix." },
  ];
};

export const loader = async () => {
  // In a real app, we would fetch data from a database or API
  const stats = [
    { title: "Active Projects", value: "3", icon: "Activity", change: "+12%" },
    { title: "Total Deployments", value: "25", icon: "TrendingUp", change: "+8%" },
    { title: "Template Downloads", value: "1.2k", icon: "Download", change: "+24%" },
    { title: "Community Stars", value: "4.8k", icon: "Star", change: "+18%" },
  ];

  const projects = [
    {
      id: 1,
      name: "Otaku Central",
      status: "deployed",
      url: "otaku-central.vercel.app",
      lastUpdate: "2 hours ago",
      template: "Modern Anime",
      views: "1.2k",
    },
    {
      id: 2,
      name: "Anime Reviews",
      status: "building",
      url: "anime-reviews.netlify.app",
      lastUpdate: "30 minutes ago",
      template: "Review Hub",
      views: "856",
    },
    {
      id: 3,
      name: "Seasonal Watch",
      status: "draft",
      url: null,
      lastUpdate: "1 day ago",
      template: "Seasonal Tracker",
      views: "0",
    },
  ];

  return json({ stats, projects });
};

export default function Index() {
  const { stats, projects } = useLoaderData();
  
  return (
    <div className="min-h-screen bg-bg text-text flex">
      <Sidebar activeView="dashboard" />
      <main className="flex-1 ml-64">
        <Dashboard stats={stats} projects={projects} />
      </main>
    </div>
  );
}

