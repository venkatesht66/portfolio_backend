const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  description: { type: String },
  techStack: [String],
  repoUrl: String,
  liveUrl: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Project', ProjectSchema);