import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";
import TemplateGallery from "~/components/TemplateGallery";

export const meta = () => {
  return [
    { title: "AnimeForge | Templates" },
    { name: "description", content: "Browse and download Remix templates for your anime website." },
  ];
};

export const loader = async () => {
  // In a real app, we would fetch templates from a database or API
  const templates = [
    {
      id: 1,
      name: "Modern Anime",
      description: "A sleek, modern template for anime content sites with dark mode and responsive design.",
      image: "/images/templates/modern-anime.jpg",
      downloads: 1240,
      rating: 4.8,
      isPremium: false,
    },
    {
      id: 2,
      name: "Review Hub",
      description: "Perfect for anime review sites with rating systems and user comments.",
      image: "/images/templates/review-hub.jpg",
      downloads: 856,
      rating: 4.6,
      isPremium: false,
    },
    {
      id: 3,
      name: "Seasonal Tracker",
      description: "Track and display seasonal anime with watchlists and episode tracking.",
      image: "/images/templates/seasonal-tracker.jpg",
      downloads: 723,
      rating: 4.7,
      isPremium: false,
    },
    {
      id: 4,
      name: "Anime Wiki",
      description: "Wiki-style template for comprehensive anime databases and information.",
      image: "/images/templates/anime-wiki.jpg",
      downloads: 512,
      rating: 4.5,
      isPremium: true,
    },
    {
      id: 5,
      name: "Character Showcase",
      description: "Highlight anime characters with detailed profiles and galleries.",
      image: "/images/templates/character-showcase.jpg",
      downloads: 489,
      rating: 4.4,
      isPremium: true,
    },
    {
      id: 6,
      name: "Anime News",
      description: "News-focused template with article layouts and featured sections.",
      image: "/images/templates/anime-news.jpg",
      downloads: 367,
      rating: 4.3,
      isPremium: true,
    },
  ];

  return json({ templates });
};

export default function Templates() {
  const { templates } = useLoaderData();
  
  return (
    <div className="min-h-screen bg-bg text-text flex">
      <Sidebar activeView="templates" />
      <main className="flex-1 ml-64">
        <TemplateGallery templates={templates} />
      </main>
    </div>
  );
}

