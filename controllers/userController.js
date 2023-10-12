const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');


// Search user
//  /api/auth/user
const userController = asyncHandler(async (req, res) => {
    const keyword = req.query.search;

    const query = keyword
        ? {
            $and: [
                {
                    $or: [
                        { name: { $regex: new RegExp(keyword, 'i') } },
                        { email: { $regex: new RegExp(keyword, 'i') } },
                    ],
                },
                {
                    _id: { $ne: req.user.id },
                },
            ],
        }
        : {};

    let users = await User.find(query).sort({ name: 1 });
    res.send(users);
});


module.exports = { userController }