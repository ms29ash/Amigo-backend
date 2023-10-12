const { body } = require('express-validator');

const loginValidation = () => [
    body("email", 'Enter a valid email').not().isEmpty().isEmail(),
    body("password", "Enter a Password").not().isEmpty()
]

module.exports = { loginValidation }