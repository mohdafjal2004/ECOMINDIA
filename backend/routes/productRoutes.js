const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProductById,
} = require("../controller/productController");

router.get("/", getProduct);
router.get("/byid/_:id", getProductById); 
 
module.exports = router; 
  