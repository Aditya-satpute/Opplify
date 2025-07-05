import React, { useState } from 'react';
import { TemplateCard } from './TemplateCard';

export const TemplateGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Popular', 'Dark', 'Light', 'Creative', 'Minimal'];

  const templates = [
    {
      id: 1,
      name: "Modern Developer",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      folder: "Portfolio1",
      tags: ["Popular", "Dark", "Developer"],
      category: "Popular",
      source: "https://github.com/Aditya-satpute"
    },
    {
      id: 2,
      name: "Creative Designer",
      image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600",
      folder: "Portfolio2",
      tags: ["Light", "Creative", "Designer"],
      category: "Creative",
      source: "https://github.com/Aditya-satpute"
    }
    
  ];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => 
        template.category === selectedCategory || 
        template.tags.includes(selectedCategory)
      );

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
};