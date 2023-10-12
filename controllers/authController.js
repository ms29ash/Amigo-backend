const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const User = require('../models/UserModel');
const genrateToken = require('../config/generateToken');


//  login user
// /api/auth/login
const loginController = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error('Please Enter valid fields');
    }

    let user = await User.findOne({ email })
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }
    let passMatch = await user.comparePass(password);
    if (passMatch) {
        res.status(200).json({ token: genrateToken(user._id), message: "Logged in successfully" })
    }

});

//Register new user
// /api/auth/register
const registerController = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    //validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error('Please Enter valid fields');
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(409).json({ message: 'User already exists' });
    }
    user = await User.create({ name: name, email: email, password: password });
    let token = genrateToken(user._id);
    return res.status(201).json({ token: token, message: "Registration completed successfully" })
});

module.exports = { loginController, registerController, userController };