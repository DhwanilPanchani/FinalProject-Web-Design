const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    bio: { type: String, required: true },
    jobRole: { type: String, required: true },
    skills: { type: [String], required: true },
    profilePhoto: { type: String, required: false }, // Cloudinary URL
    resume: { type: String, required: false }, // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('Freelancer', freelancerSchema);