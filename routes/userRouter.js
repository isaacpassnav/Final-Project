const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const ensureAuth = require("../middleware/authMiddleware");

router.post("/register", ensureAuth, userController.postUser);

router.post("/login", userController.loginUser);

router.post("/logout", userController.logoutUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", ensureAuth, userController.putUser);

router.delete("/:id", ensureAuth, userController.deleteUser);

module.exports = router;
