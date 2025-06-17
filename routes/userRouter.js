const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const ensureAuth = require("../middleware/authMiddleware");
const dataValidation = require("../middleware/dataValidations/userValidation");

router.post("/register", ensureAuth, dataValidation.validateUser, userController.postUser);

router.post("/login", dataValidation.validateUser, userController.loginUser);

router.post("/logout", dataValidation.validateUser, userController.logoutUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", ensureAuth, dataValidation.validateUserUpdate, userController.putUser);

router.delete("/:id", ensureAuth, userController.deleteUser);

module.exports = router;
