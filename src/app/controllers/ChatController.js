const { response } = require("express");
const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class ChatController {
  index(req, res) {
    const user = req.session.user;

    res.render("chat/index", { user: user });
  }
}

module.exports = new ChatController();
