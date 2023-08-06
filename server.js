const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const app = express();
const port = process.env.PORT || 3000;

// load environment variable from .env file
dotenv.config();
// middleware
app.use(cors());
app.use(express.json());

// mongoose connection.
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v7xfdwv.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => console.log("connected to database"))
  .catch((error) => {
    console.log(error.message);
  });

async function run() {}
run();

app.get("/", (req, res) => {
  res.send("Amazon server home");
});

// userRouter route
app.use("/users", userRouter);
app.get("/random", (req, res) => res.send("random user"));

// listen app to port
app.listen(port, () => {
  console.log("Amazon server is running on port 3000");
});
