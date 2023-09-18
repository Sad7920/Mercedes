const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser } = require('../controller/userController');

router.use(cors());

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;