const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const AdminController = require('../controllers/adminController');

router.get('/profile', AdminController.getProfile);
router.put('/profile', auth, AdminController.updateProfile);

module.exports = router;