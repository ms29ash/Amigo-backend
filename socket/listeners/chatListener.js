const verifyUser = require("../middleware/VerifyUser");
const {
  newChat,
  acceptRequest,
  rejectRequest,
} = require("../socketController/chatController");

const chatListener = (io, socket, userSocketMap) => {
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    socket.emit("connected");
  });

  //listener for new chat request
  socket.on("newChat", async (chat) => {
    try {
      verifyUser(io, socket, userSocketMap, chat, newChat);
    } catch (error) {
      console.log(error);
    }
  });

  // listener for accept chat
  socket.on("acceptReq", async (req) => {
    try {
      verifyUser(io, socket, userSocketMap, req, acceptRequest);
    } catch (error) {
      console.log(error);
    }
  });
  // listener for reject chat
  socket.on("rejectReq", async (req) => {
    try {
      verifyUser(io, socket, userSocketMap, req, rejectRequest);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = chatListener;
