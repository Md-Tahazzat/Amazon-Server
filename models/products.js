const mongoose = require("mongoose");

const ratingsInformation = new mongoose.Schema({
  avg_ratings: { type: String, default: "0" },
  total_ratings: { type: Number, default: 0 },
  answered_question: { type: Number, default: 0 },
});

const commentsSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: String,
  date: { type: Date, default: Date.now },
  location: String,
  comment_title: String,
  comment_text: String,
  product_img: [String],
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: String, required: true }],
  ratings_info: ratingsInformation,
  price: { type: Number, required: true },
  product_details: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  about: [{ type: String, required: true }],
  description: { type: String, required: true },
  comments: [commentsSchema],
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
  email: String,
  status: String,
});

module.exports = new mongoose.model("products", productSchema);
