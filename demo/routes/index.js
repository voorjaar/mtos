var express = require("express");
var router = express.Router();

let posts = [];

function preload() {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((r) => r.json())
    .then((arr) => {
      posts = arr;
    });
}

function load(postid) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`).then(
    (r) => r.json()
  );
}

preload();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/about", (req, res, next) => {
  res.render("about", { title: "About" });
});

router.get("/blog", (req, res, next) => {
  res.render("blog", { title: "Recent posts", posts });
});

router.get("/blog/:blogId", (req, res, next) => {
  const id = req.params.blogId;
  const index = +id - 1;
  load(id).then((article) => {
    res.render("article", {
      ...article,
      prev: posts[index - 1],
      next: posts[index + 1],
    });
  });
});

module.exports = router;
