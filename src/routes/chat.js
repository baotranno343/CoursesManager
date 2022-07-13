const express = require("express");
const ChatController = require("../app/controllers/ChatController");
const router = express.Router();

router.get("/", ChatController.index);

module.exports = router;
