const Post = require("../models/post");
const User = require("../models/user");
const { validationResult } = require("express-validator");

//get all posts
exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const postsPerPage = req.query.limit || 3;

  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .skip((currentPage - 1) * postsPerPage)
      .limit(postsPerPage);

    res.status(200).json({
      posts: posts,
      totalItems: totalItems,
      postsPerPage: postsPerPage,
    });
    console.log("✅ GET /feed/posts", posts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  const creator = req.userId;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      creator: creator,
    });

    const result = await post.save();
    const user = await User.findById(req.userId);

    user.posts.push(post);
    await user.save();

    res.status(201).json({
      post: post,
      creator: { _id: user._id, name: user.name },
    });
    console.log("✅ POST /feed/create-post", result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//get single post
exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId).populate("creator", "name");
    res.status(200).json({
      post: post,
    });
    console.log("✅ GET /feed/post/:postId", post);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//update post
exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    await post.save();

    res.status(200).json({ post: post });
    console.log("✅ PUT /update-post", post);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// delete post
exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized to delete this post.");
      error.statusCode = 403;
      throw error;
    }

    await post.deleteOne();

    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    res.status(200).json({ post: post });
    console.log("✅ DELETE /delete-post", post);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
