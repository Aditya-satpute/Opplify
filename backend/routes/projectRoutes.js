const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // ✅ This is required

// CREATE a new project
router.post('/', async (req, res) => {
  try {
    const {
      title,
      shortDesc,
      fullDesc,
      techStack,
      github,
      liveDemo,
      youtube,
      tags,
      thumbnailUrl // optional, for future use
    } = req.body;

    const newProject = new Project({
      title,
      shortDesc,
      fullDesc,
      techStack,
      github,
      liveDemo,
      youtube,
      tags,
      thumbnailUrl
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("❌ Error in POST /api/projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("❌ Error in GET /api/projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET a single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    console.error("❌ Error in GET /api/projects/:id:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE a project by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.json(updatedProject);
  } catch (error) {
    console.error("❌ Error in PUT /api/projects/:id:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a project by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("❌ Error in DELETE /api/projects/:id:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
