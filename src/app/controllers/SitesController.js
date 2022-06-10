const { response } = require("express");
const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class SitesController {
  index(req, res, next) {
    // Course.find({}, function (err, courses) {
    //   if (!err) {
    //     res.json(courses);
    //   } else {
    //     next(err);
    //   }
    // });
    Course.find({})
      .then((courses) => {
        res.render("index", { courses: mutipleMongooseToObject(courses) });
      })
      .catch(next);
  }
  show(req, res) {
    res.send("Index DETAIL");
  }
}

module.exports = new SitesController();
