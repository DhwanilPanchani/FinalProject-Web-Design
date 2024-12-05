const Freelancer = require('../models/Freelancer'); // Adjust the path if needed
//Get all freelancers
const getAllFreelancers = async (req, res) => {
    try {
        const freelancers = await Freelancer.find();
        res.status(200).json({ data: freelancers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching freelancers', error });
    }
};
const getFreelancerProfile = async (req, res) => {
    try {
        const freelancer = await Freelancer.findOne({ user: req.user.id });

        if (!freelancer) {
            return res.status(404).json({ success: false, message: 'Freelancer profile not found' });
        }

        res.status(200).json({ success: true, data: freelancer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Freelancer Profile
const updateFreelancerProfile = async (req, res) => {
    try {
        const freelancer = await Freelancer.findOneAndUpdate(
            { user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!freelancer) {
            return res.status(404).json({ success: false, message: 'Freelancer profile not found' });
        }

        res.status(200).json({ success: true, data: freelancer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createFreelancerProfile = async (req, res) => {
    try {
        const { name, location, hourlyRate, bio, jobRole, skills } = req.body;

        if (!name || !location || !hourlyRate || !bio || !jobRole || !skills) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Parse skills if sent as a string
        const parsedSkills = Array.isArray(skills) ? skills : JSON.parse(skills);

        const freelancer = new Freelancer({
            user: req.user.id,
            name,
            location,
            hourlyRate,
            bio,
            jobRole,
            skills: parsedSkills,
            profilePhoto: profilePhotoUrl,
            resume: resumeUrl,
        });

        await freelancer.save();

        res.status(201).json({
            success: true,
            message: 'Freelancer profile created successfully.',
            data: { ...freelancer._doc, profilePhoto: profilePhotoUrl },
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

module.exports = {
    getFreelancerProfile,
    updateFreelancerProfile,
    createFreelancerProfile,
    getAllFreelancers,
};