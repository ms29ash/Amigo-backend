const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET_KEY

const verifyUser = expressAsyncHandler(async (req, res, next) => {
    if (req.headers) {

        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "Token not provided" })
        }
        const data = jwt.verify(token, secret);
        req.user = data;
        next()
    }
})

module.exports = verifyUser;