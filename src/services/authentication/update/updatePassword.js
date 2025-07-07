const User = require('../../../models/userModel');
const bcrypt = require('bcryptjs');

const updatePassword = async (userId, newPassword) => {
    const user = await User.findById(userId);
    try {
        if (!newPassword) throw new Error('New password is required');

        if (!user) throw new Error('User not found');

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return {
            username: user.username,
            email: user.email,
            // riskAversion: user.riskAversion,
            // volatilityTolerance: user.volatilityTolerance,
            // growthFocus: user.growthFocus,
            // cryptoExperience: user.cryptoExperience,
            // innovationTrust: user.innovationTrust,
            // impactInterest: user.impactInterest,
            // diversification: user.diversification,
            // holdingPatience: user.holdingPatience,
            // monitoringFrequency: user.monitoringFrequency,
            // adviceOpenness: user.adviceOpenness
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = updatePassword;