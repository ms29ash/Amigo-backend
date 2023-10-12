const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/ChatModel")


// Create or Access Chat
// POST /api/chat/
const chatAccess = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        throw new Error("user is required")
    }

    let existingChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password")
        .populate("latestMsg")
        .populate({
            path: "latestMsg",
            populate: {
                path: "sender",
                select: "name pic email"
            }
        });
    if (existingChat.length > 0) {
        res.status(200).json(existingChat[0])
    } else {
        const newChat = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user.id, userId]
        }

        const createdChat = await Chat.create(newChat);
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
        );
        res.status(200).json(fullChat);
    }
})

// Fetch all chats
// GET /api/chat/chats
const fetchChats = expressAsyncHandler(async (req, res) => {

    let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate({
            path: "latestMsg",
            populate: {
                path: "sender",
                select: "name pic email",
            }
        })
        .sort({ updatedAt: -1 });

    res.status(200).json({ chats })

})


module.exports = { chatAccess, fetchChats }