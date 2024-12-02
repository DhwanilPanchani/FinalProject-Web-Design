// const Freelancer = require('../models/Freelancer'); // Adjust the path if needed
// const cloudinary = require('../cloudinaryConfig'); // Import Cloudinary configuration

// // Get Freelancer Profile
// const getFreelancerProfile = async (req, res) => {
//     try {
//         const freelancer = await Freelancer.findOne({ user: req.user.id });

//         if (!freelancer) {
//             return res.status(404).json({ success: false, message: 'Freelancer profile not found' });
//         }

//         res.status(200).json({ success: true, data: freelancer });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update Freelancer Profile
// const updateFreelancerProfile = async (req, res) => {
//     try {
//         const freelancer = await Freelancer.findOneAndUpdate(
//             { user: req.user.id },
//             req.body,
//             { new: true, runValidators: true }
//         );

//         if (!freelancer) {
//             return res.status(404).json({ success: false, message: 'Freelancer profile not found' });
//         }

//         res.status(200).json({ success: true, data: freelancer });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Create Freelancer Profile
// const createFreelancerProfile = async (req, res) => {
//     try {
//         const { name, location, hourlyRate, bio, jobRole, skills } = req.body;

//         // Validation
//         if (!name || !location || !hourlyRate || !bio || !jobRole || !skills) {
//             return res.status(400).json({ success: false, message: 'All fields are required' });
//         }

//         // Upload profile photo to Cloudinary
//         let profilePhotoUrl = null;
//         if (req.files.profilePhoto) {
//             const uploadedPhoto = await new Promise((resolve, reject) => {
//                 cloudinary.uploader.upload_stream(
//                     { resource_type: 'image' },
//                     (error, result) => {
//                         if (error) reject(error);
//                         else resolve(result);
//                     }
//                 ).end(req.files.profilePhoto[0].buffer);
//             });
//             profilePhotoUrl = uploadedPhoto.secure_url;
//         }

//         // Upload resume to Cloudinary
//         let resumeUrl = null;
//         if (req.files.resume) {
//             const uploadedResume = await new Promise((resolve, reject) => {
//                 cloudinary.uploader.upload_stream(
//                     { resource_type: 'raw' },
//                     (error, result) => {
//                         if (error) reject(error);
//                         else resolve(result);
//                     }
//                 ).end(req.files.resume[0].buffer);
//             });
//             resumeUrl = uploadedResume.secure_url;
//         }

//         // Create and save the freelancer in the database
//         const freelancer = new Freelancer({
//             user: req.user.id, // Ensure user association if authentication is in place
//             name,
//             location,
//             hourlyRate,
//             bio,
//             jobRole,
//             skills: JSON.parse(skills), // Convert stringified array to array
//             profilePhoto: profilePhotoUrl,
//             resume: resumeUrl,
//         });

//         await freelancer.save();

//         res.status(201).json({ success: true, message: 'Freelancer profile created successfully', data: freelancer });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
//     }
// };

// module.exports = {
//     getFreelancerProfile,
//     updateFreelancerProfile,
//     createFreelancerProfile,
// };




const Freelancer = require('../models/Freelancer'); // Adjust the path if needed
const cloudinary = require('../cloudinaryConfig'); // Import Cloudinary configuration

// Get Freelancer Profile
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

// Create Freelancer Profile
// const createFreelancerProfile = async (req, res) => {
//     try {
//         const { name, location, hourlyRate, bio, jobRole, skills } = req.body;

//         // Validation
//         if (!name || !location || !hourlyRate || !bio || !jobRole || !skills) {
//             return res.status(400).json({ success: false, message: 'All fields are required' });
//         }

//         // Upload profile photo to Cloudinary
//         let profilePhotoUrl = null;
//         if (req.files && req.files.profilePhoto) {
//             const uploadedPhoto = await new Promise((resolve, reject) => {
//                 cloudinary.uploader.upload_stream(
//                     { resource_type: 'image' },
//                     (error, result) => {
//                         if (error) reject(error);
//                         else resolve(result);
//                     }
//                 ).end(req.files.profilePhoto[0].buffer);
//             });
//             profilePhotoUrl = uploadedPhoto.secure_url;
//         }

//         // Upload resume to Cloudinary
//         let resumeUrl = null;
//         if (req.files && req.files.resume) {
//             const uploadedResume = await new Promise((resolve, reject) => {
//                 cloudinary.uploader.upload_stream(
//                     { resource_type: 'raw' },
//                     (error, result) => {
//                         if (error) reject(error);
//                         else resolve(result);
//                     }
//                 ).end(req.files.resume[0].buffer);
//             });
//             resumeUrl = uploadedResume.secure_url;
//         }

//         // Create and save the freelancer in the database
//         const freelancer = new Freelancer({
//             user: req.user.id, // Ensure user association if authentication is in place
//             name,
//             location,
//             hourlyRate,
//             bio,
//             jobRole,
//             skills: JSON.parse(skills), // Convert stringified array to array
//             profilePhoto: profilePhotoUrl,
//             resume: resumeUrl,
//         });

//         await freelancer.save();

//         // Explicitly include the profilePhoto URL in the response
//         res.status(201).json({
//             success: true,
//             message: 'Freelancer profile created successfully',
//             data: {
//                 ...freelancer._doc, // Return all freelancer fields
//                 profilePhoto: profilePhotoUrl, // Include the profile photo URL
//             },
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
//     }
// };
const createFreelancerProfile = async (req, res) => {
    try {
        const { name, location, hourlyRate, bio, jobRole, skills } = req.body;

        if (!name || !location || !hourlyRate || !bio || !jobRole || !skills) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        let profilePhotoUrl = null;
        if (req.files?.profilePhoto) {
            try {
                const uploadedPhoto = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'image' },
                        (error, result) => (error ? reject(error) : resolve(result))
                    ).end(req.files.profilePhoto[0].buffer);
                });
                profilePhotoUrl = uploadedPhoto.secure_url;
            } catch (error) {
                console.error('Error uploading profile photo:', error);
                return res.status(500).json({ success: false, message: 'Error uploading profile photo.' });
            }
        }

        let resumeUrl = null;
        if (req.files?.resume) {
            try {
                const uploadedResume = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'raw' },
                        (error, result) => (error ? reject(error) : resolve(result))
                    ).end(req.files.resume[0].buffer);
                });
                resumeUrl = uploadedResume.secure_url;
            } catch (error) {
                console.error('Error uploading resume:', error);
                return res.status(500).json({ success: false, message: 'Error uploading resume.' });
            }
        }

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
};