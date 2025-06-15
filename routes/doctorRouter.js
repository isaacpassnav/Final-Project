const express = require("express");
const router = express.Router();
const doctorController = require("../Controllers/doctorController")
const ensureAuth = require("../middleware/authMiddleware");

router.get("/", doctorController.getAllDoctors);

router.get("/:id", doctorController.getDoctorById);

router.get("/specialty/:id", doctorController.getDoctorsBySpecialty);

router.post("/", ensureAuth, doctorController.createDoctor);

router.put("/:id", ensureAuth, doctorController.updateDoctor);

router.delete("/:id", ensureAuth, doctorController.deleteDoctor);

module.exports = router;
