const { body } = require('express-validator');

const newMsgValidation = () =>
    body("content", 'Enter a Message').not().isEmpty()

module.exports = { newMsgValidation }