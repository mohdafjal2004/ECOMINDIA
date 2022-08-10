const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
var JWT_SECRET = "Thisismysecret";

//* Register User
const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    //Check whether user already exists or not
    var signUpEmail = await User.findOne({ email });
    if (signUpEmail) {
      return res.status(400).json("User already Exists");
    }
    //Validating whether all fields are filled or not
    if (!name || !password || !email) {
      return res.status(400).json("Please enter all fields");
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    var hashedpassword = await bcrypt.hash(password, salt);

    //Register the user
    var newUser = User.create({
      name,
      email,
      password: hashedpassword,
    });
    //data for signing the token
    const data = {
      _id: newUser._id,
    };
    console.log(data, " <= SignUp payload");
    //Signing the token
    const authTokensingup = jwt.sign(data, JWT_SECRET);
    res.json({ authTokensingup });
  } catch (error) {
    console.log(error);
  }
};

//* Authenticate user
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginemail = await User.findOne({ email });
    if (loginemail && (await bcrypt.compare(password, loginemail.password))) {
      //compare(password from UI and password in database)
      //data for signing the token
      const payload = {
        _id: loginemail._id,
      };
      console.log(payload, "Login payload");
      //Signing the token
      const authTokensingin = jwt.sign(payload, JWT_SECRET);
      res.json({ authTokensingin });
    } else {
      res.json("Invalid Credientils");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { signin, signup };
