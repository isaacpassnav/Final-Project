const express = require("express");
const router = express.Router();
const appointmentController = require("../Controllers/appointmentController");

router.get("/", appointmentController.getAllAppointments);
router.get("/:id", appointmentController.getAppointmentById);
router.post("/", appointmentController.createAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);
router.get("/user/:id", appointmentController.getAppointmentsByUser);
router.get("/doctor/:id", appointmentController.getAppointmentsByDoctor);

module.exports = router;
