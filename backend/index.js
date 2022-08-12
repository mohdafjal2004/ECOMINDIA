const express = require("express");
const path = require("path");
const app = express();
const connectToDB = require("./db");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const cartRoute = require("./routes/cartRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = 5000;
connectToDB();

app.get('/', async(req,res) => {
  res.send("Hello world")
})

app.use(express.json());
app.use(cors());
//Used for seeding data in MongoDB Database
app.use("/static", express.static(path.join(__dirname, "public")));

//user routes
app.use("/api/user/", userRoute);

//product routes
app.use("/api/product/", productRoute);

//product routes
app.use("/api/cart/", cartRoute);

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${port}`);
});
