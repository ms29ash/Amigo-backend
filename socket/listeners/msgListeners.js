const verifyUser = require("../middleware/VerifyUser");
const { sendMessage } = require("../socketController/msgController");

const msgListener = (io, socket, userSocketMap) => {
  socket.on("newMsg", async (newMsg) => {
    try {
      verifyUser(io, socket, userSocketMap, newMsg, sendMessage);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = msgListener;
