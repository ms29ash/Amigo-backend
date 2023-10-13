const jwt = require('jsonwebtoken');
require('dotenv').config()


const secret = process.env.JWT_SECRET_KEY

const genrateToken = (id) => {
    let token = jwt.sign({ id }, secret, {
        expiresIn: "30d"
    })
    return token;
}

module.exports = genrateToken;