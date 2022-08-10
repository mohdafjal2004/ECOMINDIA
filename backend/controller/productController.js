const Product = require("../models/productModel");

const getProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
const getProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id); 
    console.log(data)
    res.json(data);
  } catch (error) {
    console.log(error); 
  }
};

module.exports = { getProduct, getProductById };
