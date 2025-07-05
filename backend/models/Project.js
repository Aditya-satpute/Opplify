const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  techStack: { type: [String], required: true },
  github: { 
    type: String, 
    required: true, 
    match: /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/ 
  },
  liveDemo: String,
  youtube: String,
  tags: [String],
  thumbnailUrl: String, // For future image upload support
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
