const express = require('express');
const verifyUser = require('../middleware/verifyUser');
const { fetchMessages, sendMessage } = require('../controllers/messageController');
const { newMsgValidation } = require('../middleware/validator/newMsgValidation');
const router = express.Router()



router.get('/:chatId', verifyUser, fetchMessages)
router.post('/new', newMsgValidation(), verifyUser, sendMessage)


module.exports = router;