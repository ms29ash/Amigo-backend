const express = require('express');
const verifyUser = require('../middleware/verifyUser');
const { userController } = require('../controllers/userController');

const router = express.Router();

router.get('/search', verifyUser, userController)

module.exports = router;