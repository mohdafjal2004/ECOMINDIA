const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const connectToDB = require("./db");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const cartRoute = require("./routes/cartRoutes");
const cors = require("cors");

connectToDB(); 
app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
