const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');

router.post('/login', auth.login);
router.get('/user', authMiddleware, auth.getUser);
router.delete('/logout', authMiddleware, auth.deleteLogout);

module.exports = router;
