const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Patient is required"]
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: [true, "Doctor is required"]
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: [true, "Hospital is required"]
    },
    date: {
        type: Date,
        required: [true, "Appointment date is required"]
    },
    reason: {
        type: String,
        trim: true,
        maxlength: 300
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },
})
module.exports = mongoose.model("Appointment", appointmentSchema)