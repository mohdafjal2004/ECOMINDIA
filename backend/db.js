const mongoose = require("mongoose");
const connectToDB = () => {
  mongoose
    .connect(
      "mongodb+srv://ecomafjal786:ecomafjal786@cluster0.oj7gh.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to DB sucessfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectToDB;
