const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
