import { useState } from "react";
import { Search, Filter, Download, Star } from "lucide-react";

export default function TemplateGallery() {
  const [filter, setFilter] = useState("all");
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Template Gallery</h1>
      
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search templates..."
            className="input pl-10 w-full"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-500" />
          <select 
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Templates</option>
            <option value="blog">Blog</option>
            <option value="portfolio">Portfolio</option>
            <option value="ecommerce">E-commerce</option>
            <option value="social">Social Media</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TemplateCard
          name="Anime Blog"
          description="A clean, responsive blog template for anime reviews and articles."
          imageUrl="https://via.placeholder.com/300x200?text=Anime+Blog"
          category="Blog"
          downloads={1250}
          rating={4.8}
          isPremium={false}
        />
        
        <TemplateCard
          name="Manga Collection"
          description="Showcase your manga collection with this beautiful portfolio template."
          imageUrl="https://via.placeholder.com/300x200?text=Manga+Collection"
          category="Portfolio"
          downloads={980}
          rating={4.5}
          isPremium={false}
        />
        
        <TemplateCard
          name="Anime Tracker Pro"
          description="Track your favorite anime series with advanced features and statistics."
          imageUrl="https://via.placeholder.com/300x200?text=Anime+Tracker"
          category="Application"
          downloads={2100}
          rating={4.9}
          isPremium={true}
        />
        
        <TemplateCard
          name="Anime Merchandise Shop"
          description="Sell anime merchandise with this e-commerce template."
          imageUrl="https://via.placeholder.com/300x200?text=Anime+Shop"
          category="E-commerce"
          downloads={1560}
          rating={4.6}
          isPremium={true}
        />
        
        <TemplateCard
          name="Anime Social Network"
          description="Connect with other anime fans using this social media template."
          imageUrl="https://via.placeholder.com/300x200?text=Anime+Social"
          category="Social"
          downloads={1870}
          rating={4.7}
          isPremium={true}
        />
        
        <TemplateCard
          name="Anime News Portal"
          description="Stay updated with the latest anime news and releases."
          imageUrl="https://via.placeholder.com/300x200?text=Anime+News"
          category="Blog"
          downloads={1340}
          rating={4.4}
          isPremium={false}
        />
      </div>
    </div>
  );
}

function TemplateCard({ name, description, imageUrl, category, downloads, rating, isPremium }) {
  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        {isPremium && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            Premium
          </span>
        )}
        <span className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <Download size={14} className="mr-1" />
            <span>{downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-500 mr-1" />
            <span>{rating}/5</span>
          </div>
        </div>
      </div>
      
      <div className="border-t p-4">
        <button className={isPremium ? "btn-secondary w-full" : "btn-primary w-full"}>
          {isPremium ? "Upgrade to Access" : "Use Template"}
        </button>
      </div>
    </div>
  );
}

