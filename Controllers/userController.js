const mongoose = require("mongoose");
const User = require("../models/Users");

const getAllUsers = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Display all users'
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "server error", error:err});
    };
};

const getUserById = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Display user by ID'
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
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const postUser = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Create user'
    try {
        const { fullName, email, password, role } = req.body;
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const newUser = new User({ fullName, email, password, role });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered/created successfully", id: savedUser._id });
    } catch (err) {
        res.status(500).json({ message: "Server error ", error: err.message });
    }
};

const loginUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.status(200).json({
        message: "Authentication successful",
        user: req.user.displayName || req.user.username || "Authenticated User",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during authentication",
      error: error.message,
    });
  }
};


const logoutUser = async (req, res) => {
  try {
    const userName = req.user?.displayName || req.user?.username || "Unknown User";

    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout error", error: err });
      }

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Destroy session error", error: err });
        }

        res.clearCookie("connect.sid"); // Asegura borrar la cookie de sesión
        return res.status(200).json({
          message: "Session closed successfully",
          user: userName
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Logout error", error });
  }
};


const putUser = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Update user by ID'

  try {
    const userId = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    const updatedUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      role: req.body.role,
    };

    const response = await User.replaceOne({ _id: userId }, updatedUser);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found or no changes made." });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed, system error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Delete user by ID'
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
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};

module.exports = {getAllUsers, getUserById, postUser, loginUser, logoutUser, putUser, deleteUser};