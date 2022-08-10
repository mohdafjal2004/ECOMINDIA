const Cart = require("../models/cartModel");

//* get product from cart
const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.user })
      .populate("productId")
      .select("-userId");
    //remember not to use curly braces inside this res.json becoz we have to get it in frontend
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
  }
};

//* Add Products in cart
const AddProductInCart = async (req, res) => {
  try {
    const { productId, count } = req.body;

    if (productId && productId.length === 0) {
      res.status(400);
      throw new Error({ message: "No items found" });
    } else {
      const addproduct = await Cart.create({
        productId,
        count,
        userId: req.user,
      });
      return res.status(201).json({ addproduct });
    }
  } catch (error) {
    console.log(error, "Error while adding product in cart");
  }
};

//* Remove item from cart
const removeCartItem = async (req, res) => {
  try {
    const product = await Cart.findById(req.params.id);
    if (!product) {
      throw new Error("No items found");
    }

    const deleteProduct = await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("Deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = { getCartProducts, AddProductInCart, removeCartItem };
