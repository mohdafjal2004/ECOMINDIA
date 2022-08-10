const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartModel = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    // required: [true, 'Please provide a userId'],
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    // unique: true,
    ref: "product",
  },
  count: {
    type: Number,
    // required: true,
  },
});
const Cart = mongoose.model("cart", cartModel);
module.exports = Cart;
