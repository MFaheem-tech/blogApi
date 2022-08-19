const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const { Router } = require("express");
const bcrypt = require("bcrypt");

const router = new Router();

router.get("/all", async (req, res) => {
  try {
    const allBlogs = await Post.find();
    res.send(allBlogs);
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const rest = await Post.findById(id);

    res.json(rest);
  } catch (err) {}
});

router.post("/create", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    console.log(newPost);

    res.send(newPost);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatePost = await Post.findOneAndUpdate(req.params.id);

    updatePost.title = req.body.title;
    updatePost.description = req.body.description;

    await updatePost.save();
    res.json(updatePost);
  } catch (error) {}
});
router.delete("/:id", async (req, res) => {
  try {
    const removePost = await Post.findByIdAndDelete(req.params.id);
    res.json(removePost);
  } catch (error) {
    console.log(error);
  }
});

router.post("/post/:id/comment", async (req, res) => {
  try {
    const comment = new Comment({
      auther: req.body.auther,
      description: req.body.description,
    });
    await comment.save();
    const postRelated = await Post.find({ _id: req.body._id });
    postRelated.comments instanceof Array
      ? postRelated.comments.unshift(comment)
      : (postRelated.comments = [comment]);
    //await postRelated.save();
    res.status(200).send("Comment was added successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
