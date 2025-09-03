import { useState } from "react";
import { Link } from "@remix-run/react";
import { Download, Star, Filter, Search, Lock } from "lucide-react";

const TemplateGallery = ({ templates }) => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((template) => {
    // Filter by free/premium
    if (filter === "free" && template.isPremium) return false;
    if (filter === "premium" && !template.isPremium) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Template Gallery</h1>
        <p className="text-muted">Browse and download Remix templates for your anime website.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-surface border border-border rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Templates</option>
            <option value="free">Free Only</option>
            <option value="premium">Premium Only</option>
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="glass-effect rounded-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              {/* In a real app, we would display an actual image here */}
              <div className="text-2xl font-bold text-white/80">{template.name}</div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{template.name}</h3>
                {template.isPremium && (
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-muted mt-2">{template.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-sm text-muted">
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {template.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    {template.rating}
                  </div>
                </div>
                <Link
                  to={template.isPremium ? "/subscription" : `/templates/${template.id}/download`}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    template.isPremium
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "bg-primary text-white hover:bg-primary/90"
                  } transition-colors`}
                >
                  {template.isPremium ? "Upgrade" : "Download"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No templates found matching your criteria.</p>
          <button
            onClick={() => {
              setFilter("all");
              setSearchQuery("");
            }}
            className="mt-4 text-primary hover:text-primary/80"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;

