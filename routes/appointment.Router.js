const express = require("express");
const router = express.Router();
const appointmentController = require("../Controllers/appointmentController");
const ensureAuth = require("../middleware/authMiddleware");

router.get("/", appointmentController.getAllAppointments);
router.get("/:id", appointmentController.getAppointmentById);
router.post("/", ensureAuth, appointmentController.createAppointment);
router.put("/:id", ensureAuth, appointmentController.updateAppointment);
router.delete("/:id", ensureAuth, appointmentController.deleteAppointment);
router.get("/user/:id", appointmentController.getAppointmentsByUser);
router.get("/doctor/:id", appointmentController.getAppointmentsByDoctor);

module.exports = router;
