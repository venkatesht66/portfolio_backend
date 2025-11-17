const mongoose = require('mongoose');

const AdminProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Venkatesh T.' },
  email: { type: String, default: process.env.ADMIN_EMAIL || '' },
  phone: { type: String, default: '' },
  bio: { type: String, default: 'Full Stack Developer — React, Node.js, MongoDB, AWS' },
  avatarUrl: { type: String, default: '' },
  featuredTechs: { type: [String], default: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'] },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminProfile', AdminProfileSchema);