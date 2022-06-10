const express = require("express");
const router = express.Router();
const coursesController = require("../app/controllers/CoursesController");
const multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending .jpg
  },
});

var upload = multer({ storage: storage });
router.get("/create", coursesController.create);
router.post("/store", upload.single("img"), coursesController.store);

router.get("/:id/edit", coursesController.edit);
router.post("/handle-form-actions", coursesController.handleFormActions);
router.put("/:id", coursesController.update);
router.delete("/:id", coursesController.destroy);
router.get("/:slug", coursesController.show);
module.exports = router;
