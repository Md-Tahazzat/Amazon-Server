const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  category: String,
  subCategory: [String],
});

module.exports = new mongoose.model("CategoryList", categorySchema);
