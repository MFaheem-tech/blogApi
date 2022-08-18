const { Router } = require("express");

const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = new Router();

//update user

router.put("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json(" you can update only your account!");
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
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
