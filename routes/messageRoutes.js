const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const isAuth = require("../middleware/isAuth");

router.get("/messages/:id", isAuth, messageController.getMessages);
router.post("/messages/send", isAuth, messageController.sendMessage);

module.exports = router;
