const { response } = require("express");
const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class SitesController {
  async index(req, res, next) {
    try {
      console.log(req.session.user);
      const courses = await Course.find({});
      res.render("index", { courses: mutipleMongooseToObject(courses) });
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
  // show(req, res) {
  //   res.send("Index DETAIL");
  // }
}

module.exports = new SitesController();
