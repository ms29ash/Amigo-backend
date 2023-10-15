const chatListener = (io, socket) => {
  socket.on("setup", (chatId) => {
    socket.join(chatId);
    socket.emit("connected");
  });
};

module.exports = chatListener;
