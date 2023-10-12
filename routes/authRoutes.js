const express = require('express');
const { loginController, registerController } = require('../controllers/authController');
const { loginValidation } = require('../middleware/validator/loginValidation');
const { registerValidation } = require('../middleware/validator/registerValidation');
const verifyUser = require('../middleware/verifyUser');


const router = express.Router()

//Login route
router.post('/login', loginValidation(), loginController)
//Sign up route
router.post('/register', registerValidation(), registerController)



module.exports = router;