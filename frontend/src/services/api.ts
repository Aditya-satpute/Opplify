import axios from 'axios';
import { Project, ProjectFormData } from '../types/project';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectsApi = {
  // Get all projects
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },

  // Create a new project
  createProject: async (projectData: ProjectFormData): Promise<Project> => {
    const response = await api.post<Project>('/projects', projectData);
    return response.data;
  },

  // Get project by ID
  getProject: async (id: string): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  // Update project
  updateProject: async (id: string, projectData: Partial<ProjectFormData>): Promise<Project> => {
    const response = await api.put<Project>(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project
  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};