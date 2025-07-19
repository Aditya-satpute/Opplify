import React from 'react';
import { ExternalLink, Github, Calendar, User, Tag } from 'lucide-react';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={project.imageUrl || 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'} 
          alt={project.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors"
          >
            <Github size={16} />
          </a>
          {project.liveLink && (
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600/70 hover:bg-blue-600/90 text-white p-2 rounded-full transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{project.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <User size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">{project.author}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={14} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};