const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: String,
  href: String,
  subcategories: [{ label: String, href: String }],
});

module.exports = new mongoose.model("categories", categorySchema);
