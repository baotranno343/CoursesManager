const { response } = require("express");
const Course = require("../models/Course");
const User = require("../models/User");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const validator = require("validator");
class MeController {
  storedCreate(req, res, next) {
    Course.find({})
      .then((courses) =>
        res.render("me/stored-courses", {
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
  loginView(req, res) {
    var { user } = req.session;

    res.render("me/login");
  }
  login(req, res, next) {
    const { username, password } = req.body;
    // const user = new User(formData);
    if (!validator.isEmail(username)) {
      res.send("Khong phai email");
    }
    const user = User.findOne({
      username,
      password,
    });

    user
      .then((user) => {
        if (user) res.send("Login success");
        else res.send("Password  Incorrect");
      })
      .catch(next);
  }

  registerView(req, res) {
    res.render("me/register");
  }

  // register(req, res) {
  //   res.render("me/register");
  // }
  register(req, res) {
    const formData = req.body;
    const { username, password } = formData;
    if (!validator.isEmail(username)) {
      res.send("Khong phai email");
    }
    const user = new User(formData);

    user
      .save()
      .then(() => {
        req.session.user = { username, password };

        res.send("Login success");
      })
      .catch((error) => {
        res.send("Error");
      });
  }
}

module.exports = new MeController();
