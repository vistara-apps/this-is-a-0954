import { useState } from "react";
import { Save, Play, Download } from "lucide-react";

export default function CodeEditor() {
  const [code, setCode] = useState(`import React from 'react';

function AnimeCard({ title, imageUrl, rating }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{rating}/10</span>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;`);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Code Editor</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center">
            <Play size={16} className="mr-1" /> Preview
          </button>
          <button className="btn-secondary flex items-center">
            <Download size={16} className="mr-1" /> Export
          </button>
          <button className="btn-primary flex items-center">
            <Save size={16} className="mr-1" /> Save
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-gray-400 px-4 py-2 text-sm flex">
              <span className="border-b-2 border-blue-500 text-white px-2 py-1">AnimeCard.jsx</span>
              <span className="px-2 py-1">styles.css</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-gray-900 text-gray-100 font-mono p-4 h-[500px] focus:outline-none"
              spellCheck="false"
            />
          </div>
        </div>
        
        <div>
          <div className="card h-full">
            <h2 className="text-xl font-bold mb-4">Component Properties</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input 
                  type="text" 
                  className="input w-full" 
                  defaultValue="My Hero Academia"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input 
                  type="text" 
                  className="input w-full" 
                  defaultValue="https://example.com/anime.jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <input 
                  type="number" 
                  min="0" 
                  max="10" 
                  step="0.1"
                  className="input w-full" 
                  defaultValue="8.5"
                />
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Documentation</h3>
                <p className="text-sm text-gray-600 mb-2">
                  The AnimeCard component displays information about an anime series or movie.
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li><code className="bg-gray-100 px-1 rounded">title</code>: The name of the anime</li>
                  <li><code className="bg-gray-100 px-1 rounded">imageUrl</code>: URL to the cover image</li>
                  <li><code className="bg-gray-100 px-1 rounded">rating</code>: Numeric rating (0-10)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

