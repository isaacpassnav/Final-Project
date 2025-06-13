const mongoose = require("mongoose");

const  userSchema =  new mongoose.Schema({
    fullName:{
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Last name must be less than 50 characters"]
    },
    email:{
        type: String,
        required: [true, "email. is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "email is invalid"]
    },
    password:{
        type: String,
        required: [true, "password is requiered"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    role:{
        type: String,
        enum:["admin", "doctor", "patient"],
        default: "patient"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema)