const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const verifyJWT = require("../middlewareFunction/JWT");
const verifyDecodedEmail = require("../middlewareFunction/verifyDecodedEmail");

// import user mongoose model
const users = require("../models/user");

// all the user api which starts after /user
userRouter.post("/", async (req, res) => {
  try {
    const { email, role } = req.body;
    // generate jwt token
    const token = jwt.sign(email, process.env.SECRET_KEY);

    // check if the user already exist or not.
    const filter = { email };
    const searchedResult = await users.findOne(filter);
    // if exist then send the result with the token.
    if (searchedResult?.email) {
      res.json({ email, role: searchedResult.role, token });
    } else {
      users.create({ email, role }).then((result) => {
        console.log("inside else condition", result);
        result.token = token;
        res.json(result);
      });
    }
  } catch (error) {
    res.status(403).send({ error: true, message: "something wrong happend" });
  }
});

userRouter.put("/", verifyJWT, verifyDecodedEmail, async (req, res) => {
  try {
    const { email, role } = req.body;
    const updatedResult = await users.findOneAndUpdate(
      { email },
      { role },
      { new: true }
    );
    res.json(updatedResult);
  } catch (error) {
    res.send({
      error: true,
      message:
        "Something wrong happend. Couldn't perform the update operation.",
    });
  }
});
module.exports = userRouter;
