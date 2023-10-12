const { body } = require('express-validator');

const registerValidation = () => [
    body("name", 'Enter your  name').not().isEmpty(),
    body("email", 'Enter a valid email').not().isEmpty().isEmail(),
    body("password", "Enter a Password").not().isEmpty(),
]

module.exports = { registerValidation }