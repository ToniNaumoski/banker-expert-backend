const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');

const updateUser = async (userId, updatedData) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    // Check and update username
    if (updatedData.newUsername) {
      const existingUser = await User.findOne({ username: updatedData.newUsername });
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error('Username already exists');
      }
      user.username = updatedData.newUsername;
    }

    // Check and update email
    if (updatedData.email) {
      const existingEmail = await User.findOne({ email: updatedData.email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        throw new Error('Email already exists');
      }
      user.email = updatedData.email;
    }

    // Check and hash new password
    if (updatedData.newPassword) {
      const hashedPassword = await bcrypt.hash(updatedData.newPassword, 10);
      user.password = hashedPassword;
    }

    // Optional: Uncomment if you want to update profile fields later
    /*
    const profileFields = [
      'riskAversion', 'volatilityTolerance', 'growthFocus',
      'cryptoExperience', 'innovationTrust', 'impactInterest',
      'diversification', 'holdingPatience', 'monitoringFrequency',
      'adviceOpenness'
    ];

    profileFields.forEach(field => {
      if (updatedData[field] !== undefined) {
        const value = parseInt(updatedData[field]);
        if (value >= 1 && value <= 10) {
          user[field] = value;
        } else {
          throw new Error(`${field} must be between 1 and 10`);
        }
      }
    });
    */

    const savedUser = await user.save();

    return {
      username: savedUser.username,
      email: savedUser.email,
      // riskAversion: savedUser.riskAversion,
      // ... add profile fields if needed
    };
    
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = updateUser;