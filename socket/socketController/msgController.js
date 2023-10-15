const Message = require("../../models/MessageModel");
const Chat = require("../../models/ChatModel");

const sendMessage = async (io, socket, newMsg, id) => {
  if (newMsg && id) {
    const newData = {
      sender: id,
      content: newMsg?.content,
      chat: newMsg.chatId,
    };

    let msg = await Message.create(newData);
    msg = await Message.findById(msg._id)
      .populate("sender", "name pic")
      .populate("chat")
      .populate({
        path: "chat.users",
        select: "name pic email",
      });

    await Chat.findByIdAndUpdate(newMsg?.chatId, { latestMsg: msg });

    io.to(newMsg?.chatId).emit("newMsg", msg);

    return msg;
  }
};

module.exports = { sendMessage };
