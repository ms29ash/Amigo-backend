const express = require("express");
const colors = require("colors");
const authRoutes = require("./routes/authRoutes");
const connectToDB = require("./config/db");
require("dotenv").config();
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const userRouter = require("./routes/userRoutes");
const chatRoutes = require("./routes/ChatRoutes");
const msgRoutes = require("./routes/msgRoutes");
const socketIo = require("socket.io");
const cors = require("cors");
const setupSocket = require("./socket");
const updateRoutes = require("./routes/updateRoutes");

connectToDB();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/message", msgRoutes);
app.use("/api/updates", updateRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`.cyan);
});

//Socket.io setup
setupSocket(server);
