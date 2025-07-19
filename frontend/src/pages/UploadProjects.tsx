import React, { useState, useEffect } from 'react';
import { Plus, Grid, Upload as UploadIcon, AlertCircle, CheckCircle, Search } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectForm, ProjectFormData } from '../components/ProjectForm';
import { Project } from '../types/project';
import { projectsApi } from '../services/api';

export const UploadProjects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'upload'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line
  }, []);

  const loadProjects = async () => {
    try {
      const fetchedProjects = await projectsApi.getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setNotification({
        type: 'error',
        message: 'Failed to load projects. Please try again.',
      });
    }
  };

  const handleProjectSubmit = async (formData: Omit<ProjectFormData, 'tags' | 'techStack'> & { tags: string[]; techStack: string[] }) => {
    setIsLoading(true);
    try {
      const createdProject = await projectsApi.createProject(formData);
      setProjects(prev => [createdProject, ...prev]);
      setNotification({
        type: 'success',
        message: 'Project uploaded successfully!',
      });
      setActiveTab('projects');
    } catch (error) {
      console.error('Error creating project:', error);
      setNotification({
        type: 'error',
        message: 'Failed to upload project. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // === SEARCH LOGIC ===
  const filteredProjects = projects.filter((project) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return (
      (project.name && project.name.toLowerCase().includes(query)) ||
      (project.description && project.description.toLowerCase().includes(query)) ||
      (project.author && project.author.toLowerCase().includes(query)) ||
      (project.techStack && project.techStack.some(tech => tech.toLowerCase().includes(query))) ||
      (project.tags && project.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Grid className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Projects Hub</h1>
            </div>
            <div className="text-sm text-gray-600">
              {projects.length} projects available
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Grid size={20} />
                All Projects ({projects.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Plus size={20} />
                Upload Project
              </div>
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        {activeTab === 'projects' && (
          <div className="flex justify-end mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 transition"
                placeholder="Search by project, tag, tech stack, description, or author..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'projects' ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Featured Projects</h2>
              <button
                onClick={() => setActiveTab('upload')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Add New Project
              </button>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-6">Try a different search or be the first to share your amazing work!</p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Upload Your First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id || project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <ProjectForm onSubmit={handleProjectSubmit} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};
