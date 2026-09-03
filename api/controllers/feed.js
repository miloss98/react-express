const Post = require("../models/post");
const User = require("../models/user");
const { validationResult } = require("express-validator");

//get all posts
exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const postsPerPage = req.query.limit || 3;
  let totalItems;

  Post.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * postsPerPage)
        .limit(postsPerPage);
    })
    .then((posts) => {
      res.status(200).json({
        posts: posts,
        totalItems: totalItems,
        postsPerPage: postsPerPage,
      });
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
  let creator;

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  });

  post
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        post: post,
        creator: { _id: creator._id, name: creator.name },
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
    .populate("creator", "name")
    .then((post) => {
      res.status(200).json({
        post: post,
      });
      console.log("✅ GET /feed/post/:postId", post);
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
