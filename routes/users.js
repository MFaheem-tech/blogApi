const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { config } = require("dotenv");
const User = require("../models/user");

const router = new Router();
config();
//update user

router.put("/", async (req, res) => {
  if (!req.session.jwt) {
    return res.status(401).json({ error: "un athorized" });
  }
  try {
    const userDecoded = await jwt.verify(req.session.jwt, process.env.JWT);
    if (userDecoded) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const updatedUser = await User.findByIdAndUpdate(
        userDecoded._id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//delete user

router.delete("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted..");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json(" you can delete only your account!");
  }
});
// get user
router.get("/", async (req, res) => {
  try {
    if (!req.session) {
      return res.status(401).json({ error: "un athorized" });
    }
    const userDecoded = req.session.jwt
      ? jwt.verify(req.session.jwt, process.env.JWT)
      : "";

    const user = await User.findById(userDecoded._id);
    if (!user) {
      return res.status(400).json({ error: "account not found" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});
router.get("/logout", async (req, res) => {
  console.log("hey logout");
  req.session = null;
  return res.status(200).json({ msg: "logged out" });
});

module.exports = router;
