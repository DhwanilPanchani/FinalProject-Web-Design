const Job = require('../models/Job');

// Get All Jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('employer', 'name email');
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Job By ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employer', 'name email');

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Create job 
const createJob = async (req, res) => {
    try {
        const { title, description, location, hourlyRate } = req.body;
        const job = new Job({
            title,
            description,
            location,
            hourlyRate,
            employer: req.user._id,
        });
        const savedJob = await job.save();
        res.status(201).json({ data: savedJob });
    } catch (error) {
        res.status(500).json({ message: 'Error creating job', error });
    }
};

module.exports = { getAllJobs, getJobById , createJob };