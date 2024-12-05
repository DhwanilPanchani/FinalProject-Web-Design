    const express = require('express');
    const { getAllJobs, getJobById, createJob, getMyJobs } = require('../controllers/jobController');
    const { protect } = require('../middleware/authMiddleware');
    const router = express.Router();

    router.get('/', getAllJobs);
    router.get('/current', protect, getMyJobs)
    router.get('/:id', getJobById);
    router.post('/create', protect, createJob);
    router.get('/current', protect, getMyJobs)

    module.exports = router;