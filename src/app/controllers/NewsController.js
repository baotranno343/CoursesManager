class NewsController {
  index(req, res) {
    res.render("news");
  }
  show(req, res) {
    res.send("NEWS DETAIL");
    console.log(req.params.slug);
  }
}

module.exports = new NewsController();
