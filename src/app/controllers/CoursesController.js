const { response } = require("express");
const Course = require("../models/Course");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
const Lesson = require("../models/Lesson");

class CoursesController {
  async show(req, res, next) {
    try {
      const course = await Course.findOne({ slug: req.params.slug });
      const lesson = await Lesson.find({ slug_course: req.params.slug });
      if (course)
        res.render("courses/show", {
          course: mongooseToObject(course),
          lesson: mutipleMongooseToObject(lesson),
        });
      else {
        res.send("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
  create(req, res, next) {
    //course/:slug

    res.render("courses/create");
    //  res.send("Courses: " + req.params.slug + "");
  }
  async store(req, res, next) {
    // res.json(req.body);
    try {
      const formData = req.body;
      formData.img = req.file.filename;
      const course = new Course(formData);
      await course.save();
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
  async edit(req, res, next) {
    //course/:slug
    try {
      const course = await Course.findById(req.params.id);
      res.render("courses/edit", { course: mongooseToObject(course) });
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
    //  res.send("Courses: " + req.params.slug + "");
  }
  async update(req, res, next) {
    //res.json(req.params);
    try {
      await Course.updateOne({ _id: req.params.id }, req.body);
      res.redirect("/me/stored/courses");
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
  async destroy(req, res, next) {
    //res.json(req.params);
    try {
      await Course.deleteOne({ _id: req.params.id });
      res.redirect("/me/stored/courses");
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
  async handleFormActions(req, res, next) {
    // console.log(req.body.courseIds);
    try {
      await Course.deleteMany({ _id: { $in: req.body.courseIds } });
      res.redirect("/me/stored/courses");
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
  //Lesson
  async createLesson(req, res, next) {
    //course/:slug
    try {
      const course = await Course.findOne({ slug: req.params.slug });
      res.render("courses/lessons/create", {
        course: mongooseToObject(course),
      });
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
  async storeLesson(req, res, next) {
    // res.json(req.body);
    try {
      const formData = req.body;
      const lesson = new Lesson(formData);
      await lesson.save();
      res.redirect("/courses/" + formData.slug_course);
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
  async showLesson(req, res, next) {
    try {
      const lesson = await Lesson.findOne({
        _id: req.params.id,
      });
      if (lesson)
        res.render("courses/lessons/show", {
          lesson: mongooseToObject(lesson),
        });
      else {
        res.send("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      res.send("Something went wrong");
    }
  }
}

module.exports = new CoursesController();
