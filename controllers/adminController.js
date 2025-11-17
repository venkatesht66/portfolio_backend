const AdminProfile = require('../models/AdminProfile');

exports.getProfile = async (req, res) => {
  try {
    let profile = await AdminProfile.findOne();
    if (!profile) {
      profile = new AdminProfile({
        email: process.env.ADMIN_EMAIL || '',
        name: process.env.ADMIN_NAME || 'Admin'
      });
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    console.error('getProfile error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = {};
    ['name','email','phone','bio','avatarUrl','featuredTechs'].forEach(k => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });
    updates.updatedAt = new Date();

    let profile = await AdminProfile.findOne();
    if (!profile) {
      profile = new AdminProfile(updates);
    } else {
      Object.assign(profile, updates);
    }
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error('updateProfile error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
