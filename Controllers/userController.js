const mongoose = require("mongoose");
const User = require("../models/Users");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error retrieving", err);
        res.status(500).json({ message: "server error", error:err});
    };
};
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID"})
        };
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });          
        }
        res.status(200).json(user)
    } catch (err) {
        console.error("Error retrieving user:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
const postUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const newUser = new User({ fullName, email, password, role });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered", id: savedUser._id });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Server error ", error: err.message });
    }
};
// Login (sin auth real)
const loginUser = async (req, res) => {
    res.status(200).json({ message: "Login simulated. Auth not implemented." });
};
// Logout (solo demo)
const logoutUser = async (req, res) => {
    res.status(200).json({ message: "Logout simulated. Auth not implemented." });
};
const putUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId, req.body, { new: true })
            .select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Update failed, System error", error: err.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};

module.exports = {getAllUsers, getUserById, postUser, loginUser, logoutUser, putUser, deleteUser};