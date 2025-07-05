// backend/controllers/projectController.js
const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink } = req.body;
    const newProject = new Project({ title, description, techStack, githubLink, liveLink });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ uploadedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};
