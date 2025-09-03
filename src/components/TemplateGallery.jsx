import React, { useState } from 'react';
import { Download, Star, Eye, Search, Filter } from 'lucide-react';

const TemplateGallery = () => {
  const [templates] = useState([
    {
      id: 1,
      name: 'Modern Anime Hub',
      description: 'Clean and modern design with episode tracking',
      image: '/api/placeholder/300/200',
      downloads: '2.4k',
      stars: '156',
      category: 'Modern',
      price: 'Free',
      features: ['Responsive Design', 'Episode Tracker', 'User Reviews']
    },
    {
      id: 2,
      name: 'Seasonal Tracker',
      description: 'Perfect for tracking seasonal anime releases',
      image: '/api/placeholder/300/200',
      downloads: '1.8k',
      stars: '89',
      category: 'Tracker',
      price: 'Pro',
      features: ['Season Calendar', 'Auto Updates', 'Notifications']
    },
    {
      id: 3,
      name: 'Review Platform',
      description: 'Full-featured review and rating system',
      image: '/api/placeholder/300/200',
      downloads: '3.1k',
      stars: '234',
      category: 'Community',
      price: 'Pro',
      features: ['User Ratings', 'Comments', 'Social Features']
    },
    {
      id: 4,
      name: 'Minimal Blog',
      description: 'Simple blog template for anime content',
      image: '/api/placeholder/300/200',
      downloads: '956',
      stars: '67',
      category: 'Blog',
      price: 'Free',
      features: ['Blog Posts', 'Categories', 'SEO Optimized']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Modern', 'Tracker', 'Community', 'Blog'];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Template Gallery</h1>
        <p className="text-muted">Choose from our collection of professionally designed anime website templates.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="glass-effect rounded-lg overflow-hidden hover:shadow-card transition-all duration-300">
            {/* Template Preview */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-6xl opacity-20">🎌</div>
            </div>
            
            {/* Template Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{template.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  template.price === 'Free' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-accent/20 text-accent'
                }`}>
                  {template.price}
                </span>
              </div>
              
              <p className="text-muted text-sm mb-3">{template.description}</p>
              
              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-bg text-xs rounded-md">
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 2 && (
                    <span className="px-2 py-1 bg-bg text-xs rounded-md">
                      +{template.features.length - 2}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted mb-4">
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {template.downloads}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {template.stars}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Preview
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 px-3 rounded-md hover:bg-primary/90 transition-colors text-sm">
                  Use Template
                </button>
                <button className="px-3 py-2 border border-border rounded-md hover:bg-border/20 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;