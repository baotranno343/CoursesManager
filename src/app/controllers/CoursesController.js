const { response } = require("express");
const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CoursesController {
  show(req, res, next) {
    //course/:slug

    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
    //  res.send("Courses: " + req.params.slug + "");
  }
  create(req, res, next) {
    //course/:slug

    res.render("courses/create");
    //  res.send("Courses: " + req.params.slug + "");
  }
  store(req, res, next) {
    // res.json(req.body);
    const formData = req.body;
    formData.img = req.file.filename;
    const course = new Course(formData);

    course
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((error) => {
        res.send("Save");
      });
  }
  edit(req, res, next) {
    //course/:slug
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", { course: mongooseToObject(course) })
      )
      .catch(next);

    //  res.send("Courses: " + req.params.slug + "");
  }
  update(req, res, next) {
    //res.json(req.params);
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
  destroy(req, res, next) {
    //res.json(req.params);
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  handleFormActions(req, res, next) {
    console.log(req.body.courseIds);
    Course.deleteMany({ _id: { $in: req.body.courseIds } })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new CoursesController();
