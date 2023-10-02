const express = require("express");
const categoryRouter = express.Router();

// import categories mongoose model
const categoryList = require("../models/categories");

// all the categories api which starts after /categories
categoryRouter.get("/", async (req, res) => {
  try {
    const result = await categoryList.find({});
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
});
module.exports = categoryRouter;
