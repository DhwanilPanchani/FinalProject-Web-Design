const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register User
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
    const nameRegex = /^[a-z ,.'-]+$/i;
    const passwordExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    const validroles = ['employer', 'freelancer'];

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    if (!name || !nameRegex.test(name)) {
        return res.status(400).json({ message: "Name should not contain Special Characters or numbers" });
    }

    if (name.length < 6) {
        return res.status(400).json({ message: "Name length should be greater than 6 characters" });
    }

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Same email already exists" });
    }

    if (email.length < 8) {
        return res.status(400).json({ message: "Email length should be greater than 8 characters" });
    }

    if (!emailRegexp.test(email)) {
        return res.status(400).json({ message: "Invalid email format. Please use a Northeastern email" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    if (!passwordExpression.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one number, one special character, one lowercase character, one uppercase, and be at least 8 characters long" });
    }

    if (!role) {
        return res.status(400).json({ message: "Role is required" });
    }

    if (!validroles.includes(role)) {
        return res.status(400).json({ message: "Role must be either 'employer' or 'freelancer'" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            },
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user);

        // if (!user || !(await bcrypt.compare(password, user.password))) {
        //     return res.status(401).json({ success: false, message: 'Invalid email or password' });
        // }

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { register, login };