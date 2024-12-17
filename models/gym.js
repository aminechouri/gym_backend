const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gym", GymSchema);
