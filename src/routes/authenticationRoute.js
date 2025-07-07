const express = require('express');
const router = express.Router();
const {
    loginController,
    registerController,
    updateUserController,
    deleteUserController,
    updateEmailController,
    updatePasswordController,
    updatePreferencesController
} = require('../controllers/authenticationController');
const verifyToken = require('../middlewares/verifyToken');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', loginController);
router.post('/register', registerController);
router.patch('/updateUser', authMiddleware, updateUserController);
router.patch('/updateEmail', authMiddleware, updateEmailController);
router.patch('/updatePassword', authMiddleware, updatePasswordController);
router.patch('/updatePreferences', authMiddleware, updatePreferencesController);
router.delete('/delete', authMiddleware, deleteUserController);

module.exports = router;