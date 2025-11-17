const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.initAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  let user = await User.findOne({ email });
  if (!user) {
    const hash = await bcrypt.hash(password, 10);
    user = new User({ email, passwordHash: hash });
    await user.save();
    console.log('Admin user created with email', email);
  } else {
    console.log('Admin user exists:', email);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'replace_this_with_real_secret', { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('authController.login error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
