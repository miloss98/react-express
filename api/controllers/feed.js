const Post = require("../models/post");
const { validationResult } = require("express-validator");

//get all posts
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

//create new post
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  }

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
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//get single post
exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      res.status(200).json({ post: post });
      console.log("✅ GET /feed/post", post);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//update post
exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() });
  }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "post updated", post: result });
      console.log("✅ PUT /update-post", result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//delete post
exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  if (!postId) {
    const error = new Error("Could not find post.");
    error.statusCode = 404;
    throw error;
  }
  Post.findByIdAndDelete(postId)
    .then((result) => {
      res.status(200).json({ message: "post deleted", post: result });
      console.log("✅ DELETE /delete-post", result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
