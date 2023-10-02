const express = require("express");
const userFeatureRoter = express.Router();

// import middleware
const verifyJWT = require("../middlewareFunction/JWT");
const verifyDecodedEmail = require("../middlewareFunction/verifyDecodedEmail");

// import necessary mongoose model
const userFeatures = require("../models/userFeatures");
const userRouter = require("./userRouter");

// all the user features api which starts after /user-features
userFeatureRoter.get("/", verifyJWT, verifyDecodedEmail, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userRouter.findOne({ email });
    const features = await userFeatures.findOne({ role: user.role });
    res.json(features);
  } catch (error) {
    res.send({
      error: true,
      message: error.message,
    });
  }
});

module.exports = userFeatureRoter;
