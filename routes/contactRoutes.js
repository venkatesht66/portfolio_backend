const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contactController');
const auth = require('../middleware/auth'); 

router.post('/', contactCtrl.sendMessage);

router.get('/', auth, contactCtrl.getMessages);
router.delete('/:id', auth, contactCtrl.deleteMessage);


module.exports = router;