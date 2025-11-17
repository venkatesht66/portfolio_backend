const Experience = require('../models/Experience');

exports.createExperience = async (req, res) => {
  try {
    const data = req.body;
    const e = new Experience(data);
    await e.save();
    res.status(201).json(e);
  } catch (err) {
    console.error('createExperience err', err);
    res.status(400).json({ message: err.message || 'Bad request' });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const e = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!e) return res.status(404).json({ message: 'Not found' });
    res.json(e);
  } catch (err) {
    console.error('updateExperience err', err);
    res.status(400).json({ message: err.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const e = await Experience.findByIdAndDelete(req.params.id);
    if (!e) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('deleteExperience err', err);
    res.status(400).json({ message: err.message });
  }
};

exports.getExperience = async (req, res) => {
  try {
    const e = await Experience.findById(req.params.id);
    if (!e) return res.status(404).json({ message: 'Not found' });
    res.json(e);
  } catch (err) {
    console.error('getExperience err', err);
    res.status(400).json({ message: err.message });
  }
};

exports.listExperiences = async (req, res) => {
  try {
    const items = await Experience.find().sort({ order: 1, startDate: -1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('listExperiences err', err);
    res.status(500).json({ message: 'Server error' });
  }
};