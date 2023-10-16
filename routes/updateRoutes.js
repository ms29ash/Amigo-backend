const express = require("express");
const verifyUser = require("../middleware/verifyUser");
const {
  getNotifications,
  getRequests,
} = require("../controllers/updateController");
const router = express.Router();

router.get("/notifications", verifyUser, getNotifications);
router.get("/requests", verifyUser, getRequests);

module.exports = router;
