const mongoose = require("mongoose");

const mongodb_URI = process.env.MONGODB_URI;

const connect = async () => {
  try {
    await mongoose.connect(mongodb_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Dabatase online");
  } catch (ERR) {
    console.error(ERR.message);
  }
};

module.exports = {
  connect
};
