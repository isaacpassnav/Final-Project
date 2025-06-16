const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hospital name is required"],
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
    match: [/^\+?[0-9\s\-]{7,20}$/, "Invalid phone number format"]
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, "Invalid website URL"]
  },
  capacity: {
    type: Number,
    min: [0, "Capacity must be at least 0"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);
