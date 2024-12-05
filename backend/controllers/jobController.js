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
        const userId = req.user._id;
        const job = new Job({
            title,
            description,
            location,
            hourlyRate,
            employer: userId,
        });
        const savedJob = await job.save();
        res.status(201).json({ data: savedJob });
    } catch (error) {
        res.status(500).json({ message: 'Error creating job', error });
    }
};
const getMyJobs = async (req, res) => {
    try{
        console.log(req.user._id);
        
        const userId = req.user._id;
        const response = await Job.find({employer: userId})
        res.status(201).json({ data: response});
    }
    catch(error){
        res.status(500).json({ message: 'Error getting jobs', error });
    }
}

// const applyForJob = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const jobId = req.params.id;

//         // Add job ID to the user's applied jobs
//         const job = await Job.findById(jobId);

//         if (!job) {
//             return res.status(404).json({ success: false, message: 'Job not found' });
//         }

//         // Assuming you have a User model with an appliedJobs field
//         const User = require('../models/User');
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         if (user.appliedJobs.includes(jobId)) {
//             return res.status(400).json({ success: false, message: 'You have already applied for this job' });
//         }

//         user.appliedJobs.push(jobId);
//         await user.save();

//         res.status(200).json({ success: true, message: 'Job application successful' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


const applyForJob = async (req, res) => {
    try {
        const userId = req.user._id; // Logged-in user ID
        const jobId = req.params.id; // Job ID from request

        const job = await Job.findById(jobId); // Find the job details
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        const User = require('../models/User');
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the user has already applied for this job
        const alreadyApplied = user.appliedJobs.some((appliedJob) => appliedJob._id.toString() === job._id.toString());
        if (alreadyApplied) {
            return res.status(400).json({ success: false, message: 'You have already applied for this job' });
        }

        // Add job to user's appliedJobs array
        user.appliedJobs.push({
            _id: job._id,
            title: job.title,
            description: job.description,
            location: job.location,
            hourlyRate: job.hourlyRate,
        });

        await user.save(); // Save updated user record

        res.status(200).json({ success: true, message: 'Successfully applied for the job', appliedJobs: user.appliedJobs });
    } catch (error) {
        console.error('Error applying for the job:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


module.exports = { getAllJobs, getJobById, createJob, getMyJobs, applyForJob };
