const { response } = require("express");
const Course = require("../models/Course");
const User = require("../models/User");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const validator = require("validator");
class MeController {
  async storedCreate(req, res, next) {
    try {
      const courses = await Course.find({});
      res.render("me/stored-courses", {
        courses: mutipleMongooseToObject(courses),
      });
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
  loginView(req, res) {
    console.log(req.session.user);
    res.render("me/login");
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      // const user = new User(formData);
      if (!validator.isEmail(username)) {
        return res.send("Wrong Email Address");
      }
      const user = await User.findOne({
        username,
        password,
      });
      if (user) {
        req.session.user = { username, password };
        res.send("Login success");
      } else res.send("Password  Incorrect");
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }

  registerView(req, res) {
    res.render("me/register");
  }

  async register(req, res, next) {
    try {
      const formData = req.body;
      const { username, password } = formData;
      if (!validator.isEmail(username)) {
        return res.send("Wrong Email Address");
      }
      const findUsername = await User.findOne({
        username,
      });
      if (findUsername) return res.send("Account already exists");
      const user = new User(formData);
      await user.save();
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
}

module.exports = new MeController();
