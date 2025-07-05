import React from 'react';
import { Eye, Download } from 'lucide-react';

interface Template {
  id: number;
  name: string;
  image: string;
  folder: string;
  tags: string[];
  category: string;
  source: string;
}

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'popular':
        return 'bg-red-100 text-red-800';
      case 'dark':
        return 'bg-gray-800 text-white';
      case 'light':
        return 'bg-blue-100 text-blue-800';
      case 'creative':
        return 'bg-purple-100 text-purple-800';
      case 'minimal':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const previewLink = `/portfolioTemplates/${template.folder}/index.html`;
  const sourceCode = `${template.source}`;
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Template Image */}
      <div className="relative overflow-hidden h-64 bg-gray-100">
        <img 
          src={template.image} 
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <a
            href={previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium transition-transform duration-200 hover:scale-105"
          >
            Quick Preview
          </a>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{template.name}</h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.map((tag, index) => (
            <span 
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <a
            href={previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </a>
          <button
          onClick={() => window.open(sourceCode, '_blank')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
          >
          <Download className="h-4 w-4 mr-2" />
          Use Template
          </button>

        </div>
      </div>
    </div>
  );
};
