const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const verifyUser = require('../middleware/verifyUser');
const { chatAccess, fetchChats } = require('../controllers/chatController');
const router = express.Router()

router.post('/', verifyUser, chatAccess)
router.get('/chats', verifyUser, fetchChats)



module.exports = router;