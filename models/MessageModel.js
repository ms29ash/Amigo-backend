const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    content: { type: String, ref: "User" },
    chat: { type: mongoose.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Types.ObjectId, ref: "User" }]
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;