const verifyUser = require("../middleware/VerifyUser");
const { sendMessage } = require("../socketController/msgController");

const msgListener = (io, socket) => {
  socket.on("newMsg", async (newMsg) => {
    try {
      verifyUser(io, socket, newMsg, sendMessage);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = msgListener;
