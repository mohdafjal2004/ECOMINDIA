const express = require("express");
const router = express.Router();
const firstlogin = require("../utils/firstlogin");

const {
  getCartProducts,
  AddProductInCart,
  removeCartItem,
} = require("../controller/cartController");

router.get("/getcartproduct", firstlogin, getCartProducts);
router.post("/addproductincart", firstlogin, AddProductInCart);
router.delete("/deleteCartProduct/_:id",firstlogin, removeCartItem);
module.exports = router;
