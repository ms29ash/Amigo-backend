const socketio = require("socket.io");
const chatListener = require("./listeners/chatListener");
const msgListener = require("./listeners/msgListeners");

const userSocketMap = new Map();

const setupSocket = (server) => {
  const io = socketio(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  const onConnection = (socket) => {
    socket.on("setup", (data) => {
      userSocketMap.set(data, socket.id);
    });

    chatListener(io, socket, userSocketMap);
    msgListener(io, socket, userSocketMap);
  };

  io.on("connection", onConnection);
};

module.exports = setupSocket;
