const express = require("express");
const router = express.Router();
const doctorController = require("../Controllers/doctorController")

router.get("/", doctorController.getAllDoctors);

router.get("/:id", doctorController.getDoctorById);

router.get("/specialty/:id", doctorController.getDoctorsBySpecialty);

router.post("/", doctorController.createDoctor);

router.put("/:id", doctorController.updateDoctor);

router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;
