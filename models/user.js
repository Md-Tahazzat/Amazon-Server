const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: String,
  role: String,
});

const user = new model("users", userSchema);
module.exports = user;
