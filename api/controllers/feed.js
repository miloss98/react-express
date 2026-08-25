exports.getPosts = (req, res, next) => {
  res.status(200).json([{ title: "radi" }]);
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  console.log("✅ POST /feed/create-post", "Data received:", req.body);

  res.status(201).json({
    message: "Post created successfully!",
    post: { title: title, content: content, imageUrl: imageUrl },
  });
};
