const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'replace_this_with_real_secret';

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return res.status(401).json({ message: 'No token' });

  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid auth header' });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
