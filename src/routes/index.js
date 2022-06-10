const newsRouter = require("./news");
const sitesRouter = require("./sites");
const meRouter = require("./me");
const coursesRouter = require("./courses");
function route(app) {
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/", sitesRouter);
}
module.exports = route;
