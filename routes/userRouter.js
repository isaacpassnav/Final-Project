const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/register", userController.postUser);

router.post("/login", userController.loginUser);

router.post("/logout", userController.logoutUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.putUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
