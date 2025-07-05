const Project = require('../models/projects');

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Get a single project by ID
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const {
      title, shortDesc, fullDesc, techStack, github,
      liveDemo, thumbnailUrl, youtube, tags
    } = req.body;

    const project = new Project({
      title,
      shortDesc,
      fullDesc,
      techStack,
      github,
      liveDemo,
      thumbnailUrl,
      youtube,
      tags
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create project', details: err.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update project', details: err.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
