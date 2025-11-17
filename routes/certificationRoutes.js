const express = require('express');
const router = express.Router();
const CertificationController = require('../controllers/certificationController');
const auth = require('../middleware/auth');

router.get('/', CertificationController.getCertifications);
router.post('/', auth, CertificationController.createCertification);
router.put('/:id', auth, CertificationController.updateCertification);
router.delete('/:id', auth, CertificationController.deleteCertification);

module.exports = router;