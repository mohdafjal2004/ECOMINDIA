const fs = require("fs");
const connectToDB = require("./db");
connectToDB();

//Load models
const Product = require("./models/productModel");

//Read the JSON file
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/data/productData.json`, "utf-8")
);
console.log(products);

//Import Sample Data in DB
const importData = async () => {
  try {
    await Product.create(products);
    console.log("Data successfully imported");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete the Data from DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
