const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: error.message });
  }
});

router.get("/spec", (req, res) => {
  res.send("we are on spec ");
});

router.post("/", async (req, res) => {
  const { title = null, description = null } = req.body;

  if (!title || !description) {
    res.status = 400;
    return res.json({
      message: "Bad request",
    });
  }

  const post = new Post({ title, description });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//specific
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.json({ message: error.message });
  }
});
//delete
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (error) {
    res.json({ message: error.message });
  }
});
//update

router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error.message });
  }
});
module.exports = router;
