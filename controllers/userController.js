const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const expressAsyncHandler = require('express-async-handler');


// Search users
//GET  /api/auth/user
const userController = asyncHandler(async (req, res) => {
    const keyword = req.query.search;

    const query = keyword
        ? {
            $and: [
                { name: { $regex: new RegExp(keyword, 'i') } },
                {
                    _id: { $ne: req.user.id },
                },
            ],
        }
        : { _id: { $ne: req.user.id } };

    let users = await User.find(query).sort({ name: 1 });
    res.status(200).json(users);
});



// fetch user data
//GET  /api/auth/userdata
const fetchUser = expressAsyncHandler(async (req, res) => {

    let user = await User.findOne({ _id: req.user.id }).select('-password')
    if (user) {
        return res.status(200).json({ user })
    } else {
        throw new Error("User not found")
    }
})

module.exports = { userController, fetchUser }