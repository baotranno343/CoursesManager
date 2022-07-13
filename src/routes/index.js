const sitesRouter = require("./sites");
const meRouter = require("./me");
const chatRouter = require("./chat");
const coursesRouter = require("./courses");
function route(app) {
  app.use("/chat", chatRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/", sitesRouter);
}
module.exports = route;
