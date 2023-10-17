const Chat = require("../../models/ChatModel");
const Notification = require("../../models/NotificationModel");
const Request = require("../../models/RequestModel");

const newChat = async (io, socket, userSocketMap, chat, id) => {
  //getting socket id of ther recipient form map
  let user = userSocketMap.get(chat.id);
  //check if id is present
  if (chat.id && id) {
    //check for exiting chats
    let existingChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: id } } },
        { users: { $elemMatch: { $eq: chat.id } } },
      ],
    });

    //if chat exist return
    if (existingChat.length > 0 && user) {
      return;
    } else {
      let existingReq = await Request.find({
        requester: id,
        recipient: chat.id,
        status: {
          $in: ["pending"],
          $nin: ["rejected", "accepted"],
        },
      });
      if (existingReq?.length > 0) {
        return;
      }

      //if chat is not present creating req to recipient
      const newReq = {
        requester: id,
        recipient: chat.id,
      };
      const newRequest = await Request.create(newReq);
      const Req = await Request.findOne({ _id: newRequest._id })
        .populate("requester", "-password")
        .populate("recipient", "-password");

      //sending request to  recipient to create chat
      if (user) {
        io.to(user).emit("newReq", Req);
        socket.emit("reqSent", Req);
      }
    }
  }
};

const acceptRequest = async (io, socket, userSocketMap, chat, id) => {
  //gettting both user socket id from map
  let user = userSocketMap.get(chat.id);

  if (chat.id && id && chat.reqId) {
    //creating new chat for both user
    let newChat = {
      chatName: chat.chatName || "chat",
      isGroupChat: false,
      users: [chat.id, id],
    };
    const createdChat = await Chat.create(newChat);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    //if chat is created changing status of req to "accepted"
    if (fullChat) {
      let req = await Request.findOneAndUpdate(
        { _id: chat.reqId },
        { status: "accepted" },
        { new: true }
      );

      //creating notification for requester
      if (req) {
        const newNoti = await Notification.create({
          recipient: chat.id,
          message: `${chat.username} accepted your request`,
        });

        //sending chat and notification to requester
        if (user) {
          io.to(user).emit("accecptReq", {
            fullChat,
            newNoti,
            reqId: chat.reqId,
          });
        }
        socket.emit("onAccecptReq", { fullChat, reqId: chat.reqId });
      }
    }
  }
};

const rejectRequest = async (io, socket, userSocketMap, data, id) => {
  //getting id of requester from map
  let user = userSocketMap.get(data.id);

  //req rejected so changing status of req to rejected
  if (data.id && id && data.reqId) {
    let req = await Request.findOneAndUpdate(
      { _id: data.reqId },
      { status: "rejected" },
      { new: true }
    );

    //sending notification to requester
    if (req) {
      const newNoti = await Notification.create({
        recipient: data.id,
        message: `${data.username} rejected your request`,
      });

      if (user) {
        io.to(user).emit("rejectReq", { newNoti, reqId: data.reqId });
      }
      socket.emit("onReject", { reqId: data.reqId });
    }
  }
};

module.exports = { newChat, rejectRequest, acceptRequest };
