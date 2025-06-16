const express = require("express");
const router = express.Router();
const appointmentController = require("../Controllers/appointmentController");
const ensureAuth = require("../middleware/authMiddleware");
const dataValidation = require("../middleware/dataValidations/appointmentValidation");

router.get("/", appointmentController.getAllAppointments);
router.get("/:id", appointmentController.getAppointmentById);
router.post("/", ensureAuth, dataValidation.validateAppointment, appointmentController.createAppointment);
router.put("/:id", ensureAuth, dataValidation.validateAppointmentUpdate, appointmentController.updateAppointment);
router.delete("/:id", ensureAuth, appointmentController.deleteAppointment);
router.get("/user/:id", appointmentController.getAppointmentsByUser);
router.get("/doctor/:id", appointmentController.getAppointmentsByDoctor);

module.exports = router;
