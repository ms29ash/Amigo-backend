const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const Chat = require("../models/ChatModel");

// Get all messages
// GET /api/message/:chatId
// Protected
const fetchMessages = expressAsyncHandler(async (req, res) => {
    const messages = await Message.find({}).populate('sender', 'name pic emai').populate('chat');
    res.status(200).json({ messages })

})

// Create a new message
// POST /api/message/new
// protected
const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    let newMsg = {
        sender: req.user.id,
        content: content,
        chat: chatId,
    }

    let msg = await Message.create(newMsg);
    msg = await Message.findById(msg._id)
        .populate("sender", "name pic")
        .populate("chat")
        .populate({
            path: "chat.users",
            select: "name pic email",
        });


    await Chat.findByIdAndUpdate(chatId, { latestMsg: msg });
    res.status(201).json(msg)


})

module.exports = { fetchMessages, sendMessage }