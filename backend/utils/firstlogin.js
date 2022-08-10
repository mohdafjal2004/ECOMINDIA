var JWT_SECRET = "Thisismysecret";
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const firstlogin = async (req, res, next) => {
  let token = await req.header("auth-token");
  if (!token) {
    return res.status(401).json({
      error: "No token found ",
    });
  }
  //Verify token
  try {
    //Get user from token
    const USERID = jwt.verify(token, JWT_SECRET);
    console.log(USERID);
    //Get user from token
    req.user = await User.findById(USERID._id).select("-password");
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({
      error: "Unauthorized User, Invalid token",
    });
  }
};
module.exports = firstlogin;
