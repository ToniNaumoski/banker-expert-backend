const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (username, password) => {
    try {
        console.log('Login service - Looking for username:', username);
        const user = await User.findOne({ username });
        console.log('Login service - User found:', user ? 'Yes' : 'No');
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid user credentials');

        const token = jwt.sign(
            { id: user._id, username: user.username }, // include user ID
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = login;