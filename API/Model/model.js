const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
