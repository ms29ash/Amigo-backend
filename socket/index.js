const socketio = require("socket.io");
const chatListener = require("./listeners/chatListener");
const msgListener = require("./listeners/msgListeners");

const setupSocket = (server) => {
  const io = socketio(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  const onConnection = (socket) => {
    console.log("connected to socket");
    chatListener(io, socket);
    msgListener(io, socket);
  };

  io.on("connection", onConnection);
};

module.exports = setupSocket;
