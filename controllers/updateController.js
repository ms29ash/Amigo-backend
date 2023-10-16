const expressAsyncHandler = require("express-async-handler");
const Notification = require("../models/NotificationModel");
const Request = require("../models/RequestModel");

//Fetch all notifications of user
// GET /api/updates/notifications
const getNotifications = expressAsyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    recipient: req.user.id,
  })
    .populate("recipient", "-password")
    .sort({ createdAt: -1 });
  res.status(200).json({ notifications });
});

//Fetch all requests of user
// GET /api/updates/requests
const getRequests = expressAsyncHandler(async (req, res) => {
  const requests = await Request.find({
    $or: [
      { recipient: req.user.id, status: "pending" },
      { requester: req.user.id, status: "pending" },
    ],
  })
    .populate("requester", "-password")
    .populate("recipient", "-password")
    .sort({ createdAt: -1 });
  res.status(200).json({ requests });
});

module.exports = { getNotifications, getRequests };
