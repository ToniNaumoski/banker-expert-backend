const User = require('../../../models/userModel');

const updateEmail = async (userId, newEmail) => {
    const user = await User.findById(userId);
     
    try {
        if (!newEmail) throw new Error('New email is required');
        
      //  const user = await User.findOne({ username });
        if (!user) throw new Error('User not found');
        
        const existingEmail = await User.findOne({ email: newEmail });
        if (existingEmail) throw new Error('Email already exists');

        user.email = newEmail;

        await user.save();

        return {
            username: user.username,
            email: user.email
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = updateEmail;