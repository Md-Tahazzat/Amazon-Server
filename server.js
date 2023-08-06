const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;

// import all the mongoose models for mongodb database.
const CategoryList = require("./models/Category");

// load environment variable from .env file
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// mongoose connection.
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v7xfdwv.mongodb.net/Amazon?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("connected to database"))
  .catch((error) => {
    console.log(error.message);
  });

app.get("/", (req, res) => {
  res.send("Amazon server home");
});
app.get("/categories", async (req, res) => {
  try {
    const result = await CategoryList.find({});
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
});

// listen app to port
app.listen(port, () => {
  console.log("Amazon server is running on port 5000");
});
