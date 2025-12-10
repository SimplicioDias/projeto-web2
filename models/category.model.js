const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String }
});

module.exports = mongoose.model("Category", CategorySchema);
