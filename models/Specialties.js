const mongoose = require("mongoose");
const specialtySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Specialty name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Specialty name must be at least 3 characters long"],
      maxlength: [50, "Specialty name can't be longer than 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description can't be longer than 300 characters"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Specialty", specialtySchema);