const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("product", productModel);
module.exports = Product;
