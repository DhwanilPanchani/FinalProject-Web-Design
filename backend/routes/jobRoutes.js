const express = require('express');
const { getAllJobs, getJobById, createJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/create', createJob);

module.exports = router;