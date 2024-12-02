const express = require('express');
const { getAllJobs, getJobById } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);

module.exports = router;