const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '3435304115fd55f5fb60377325d13d591c8cd49a';

const register = async (req, res) => {
    try {
        console.log(req.body, "99999999999")
        const { first_name, last_name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        return res.status(201).json({
            status: "success",
            data: {
                user: savedUser._id,
            },
            message: "Registration successful. Please log in.",
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "An error occurred during registration. Please try again later.",
        });
    }
};

const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "An error occurred during login. Please try again later.",
        });
    }
};
module.exports = {
    register,
    login
};
