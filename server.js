const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// import all the Router
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const userFeatureRoter = require("./routes/userFeaturesRouter");

// load environment variable from .env file
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// Connect mongoDB with mongoose with retry
let attempts = 1; // Number of retry attempts
let retryInterval = 1000; // Initial retry interval time
let retryConnectionTimeoutId;

const retryConnection = () => {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("Connected to Database");
    clearTimeout(retryConnectionTimeoutId);
    return;
  } catch (error) {
    console.log(`Connection failed (Attempts ${attempts}) : ${error.message}`);
  }

  // call the retryConnection function after a certain period of time to connect
  if (attempts < 5) {
    attempts++;
    console.log(`Retrying in ${retryInterval / 1000} sec...`);
    retryConnectionTimeoutId = setTimeout(() => {
      retryInterval *= 2; // Exponential backoff.
      retryConnection();
    }, retryInterval);
  } else {
    console.log(`Connection attempts exhausted. Exiting...`);
  }
};

// Start the initial connection attempts
retryConnection();

app.get("/", (req, res) => {
  res.send("Amazon server home");
});

// use all the router in app
app.use("/user", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/user-features", userFeatureRoter);

// listen app to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Amazon server is running on port ${port}`);
});
