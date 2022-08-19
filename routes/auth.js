const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = new Router();
config();
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      return res.status(400).json("Wrong credentials");
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong credentials");
    }

    // const { password, ...others } = user._doc;
    delete user.password;

    const token = await jwt.sign(user, process.env.JWT);
    req.session = { jwt: token };

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
