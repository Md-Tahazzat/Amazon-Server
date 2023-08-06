const express = require("express");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  res.send("all users route");
});
userRouter.get("/new", async (req, res) => {
  res.send("new user route");
});
userRouter.get("/name", async (req, res) => {
  console.log(req.query.name);
  res.send(`${req.query.name} users route`);
});

userRouter.get("/:id", async (req, res) => {
  res.send(`${req.params.id} users route`);
});

module.exports = userRouter;
