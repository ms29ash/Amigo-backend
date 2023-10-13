const express = require('express');
const verifyUser = require('../middleware/verifyUser');
const { userController, fetchUser } = require('../controllers/userController');

const router = express.Router();

router.get('/search', verifyUser, userController)
router.get('/userdata', verifyUser, fetchUser)

module.exports = router;