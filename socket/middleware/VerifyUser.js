const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET_KEY;

const verifyUser = (io, socket, userSocketMap, newData, next) => {
  const token = newData?.token;
  if (!token) {
    socket.to("errUser").emit("User not verified");
    return;
  }
  const data = jwt.verify(token, secret);
  next(io, socket, userSocketMap, newData, data?.id);
};

module.exports = verifyUser;
