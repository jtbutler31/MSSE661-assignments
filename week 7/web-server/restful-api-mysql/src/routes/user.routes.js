const express = require('express');
const { getMe, updateUsername, updatePassword } = require('../controllers/user.controller');
const canAccess = require('../middleware/auth.middleware');

const userRoutes = express.Router();

userRoutes.get('/me', canAccess, getMe); // /api/user/me

userRoutes.put('/me/update/username', canAccess, updateUsername);

userRoutes.put('/me/update/password', canAccess, updatePassword);

module.exports = userRoutes;