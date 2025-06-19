const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [50, "First name must be less than 50 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [50, "Last name must be less than 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
  },
  phone: {
    type: Number,
    trim: true,
    match: [/^\+?[0-9]{7,15}$/, "Please provide a valid phone number"],
    min: [1000000000, "Phone number must be at least 10 digits long"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"]
  },
  specialty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialty",
    required: [true, "Specialty is required"]
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: [true, "Hospital is required"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);