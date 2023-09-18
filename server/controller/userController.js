const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function registerUser(req, res) {
    try {
        const { email, password, name, companyId } = req.body;
        if (!email || !password || !name || !companyId) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingEmail = await UserModel.findOne({ email: email });
        const existingId = await UserModel.findOne({ companyId: companyId });

        if (existingEmail) {
            return res.status(400).json({ message: 'User with the same email already exists' });
        }

        if (existingId) {
            return res.status(400).json({ message: 'User with the same company ID already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ email, password: hashedPassword, name, companyId });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        console.log('Searching for user with email:', email);
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({ message: 'Authentication successful', token: token, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = { registerUser, loginUser };
