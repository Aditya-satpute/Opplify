const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const { name, description, tags, techStack, githubLink, liveLink, imageUrl, author } = req.body;

    if (!name || !description || !tags || !techStack || !githubLink || !author) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const project = new Project({
      name: name.trim(),
      description: description.trim(),
      tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
      techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(tech => tech.trim()),
      githubLink: githubLink.trim(),
      liveLink: liveLink?.trim() || null,
      imageUrl: imageUrl?.trim() || null,
      author: author.trim()
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { name, description, tags, techStack, githubLink, liveLink, imageUrl, author } = req.body;
    const updateData = {
      ...(name && { name: name.trim() }),
      ...(description && { description: description.trim() }),
      ...(tags && { tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()) }),
      ...(techStack && { techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(tech => tech.trim()) }),
      ...(githubLink && { githubLink: githubLink.trim() }),
      ...(liveLink && { liveLink: liveLink.trim() }),
      ...(imageUrl && { imageUrl: imageUrl.trim() }),
      ...(author && { author: author.trim() })
    };

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
