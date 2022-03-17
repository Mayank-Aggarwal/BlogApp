const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true},
  title: { type: String, required: true},
  url: { type: String, required: true},
  data: { type: String, required: true},
  category: { type: Array, required: true}
});

module.exports = Blog = mongoose.model("blog", userSchema);
