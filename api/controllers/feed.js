const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ posts: posts });
      console.log("✅ GET /feed/posts", posts);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  const creator = { name: "Milos" };

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: creator,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        post: result,
      });
      console.log("✅ POST /feed/create-post", result);
    })
    .catch((err) => {
      console.log(err);
    });
};
