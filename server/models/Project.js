const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  techStack: { type: [String], required: true },
  githubLink: { type: String, required: true },
  liveLink: { type: String },
  imageUrl: { type: String },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
