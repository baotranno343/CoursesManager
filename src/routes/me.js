const express = require("express");
const session = require("express-session");
const router = express.Router();
const meController = require("../app/controllers/MeController");
router.get("/login", meController.loginView);
router.post("/login", meController.login);
router.get("/register", meController.registerView);
router.post("/register", meController.register);
router.get("/stored/courses", meController.storedCreate);

module.exports = router;
