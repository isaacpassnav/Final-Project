const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hospital name is required"],
    unique: true,
    trim: true,
    minlength: [5, "Hospital name must be at least 5 characters long"],
    maxlength: [100, "Hospital name can't be longer than 100 characters"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
    minlength: [5, "Hospital address must be at least 5 characters long"],
    maxlength: [200, "Hospital address can't be longer than 200 characters"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    trim: true,
    match: [/^\+?[0-9\s\-]{7,20}$/, "Invalid phone number format"],
    min: [1000000000, "Phone number must be at least 10 digit long"]
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, "Invalid website URL"]
  },
  capacity: {
    type: Number,
    required: [true, "Capacity is required"],
    min: [1, "Capacity must be at least 1"],
  }
}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);
