const express = require("express");
const productRouter = express.Router();
const verifyJWT = require("../middlewareFunction/JWT");
const verifyDecodedEmail = require("../middlewareFunction/verifyDecodedEmail");

// Import products model
const productsCollection = require("../models/products");
const mongoose = require("mongoose");

// all the products api which starts after /products
// Get products based on category & sub_category
productRouter.get("/", async (req, res) => {
  const { category, sub_category } = req.query;
  try {
    let result;
    if (!!sub_category) {
      result = await productsCollection.find({
        category,
        sub_category,
        status: "approved",
      });
    } else {
      result = await productsCollection.find({ category, status: "approved" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});
// Get a product
productRouter.get("/:id", async (req, res) => {
  try {
    const result = await productsCollection.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      status: "approved",
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

productRouter.post(
  "/add-product",
  verifyJWT,
  verifyDecodedEmail,
  async (req, res) => {
    try {
      const product = req.body;
      const result = await productsCollection.create(product);
      res.json(result);
    } catch (error) {
      res.send(error);
    }
  }
);
module.exports = productRouter;
