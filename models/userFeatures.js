const mongoose = require("mongoose");

const userFeaturesSchema = new mongoose.Schema({
  role: String,
  features: [{ label: String, link: String }],
});

module.exports = new mongoose.model("userFeatures", userFeaturesSchema);
