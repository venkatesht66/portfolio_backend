const express = require('express');
const router = express.Router();
const ExperienceController = require('../controllers/experienceController');
const auth = require('../middleware/auth');

router.get('/', ExperienceController.listExperiences);
router.get('/:id', ExperienceController.getExperience);

router.post('/', auth, ExperienceController.createExperience);
router.put('/:id', auth, ExperienceController.updateExperience);
router.delete('/:id', auth, ExperienceController.deleteExperience);

module.exports = router;