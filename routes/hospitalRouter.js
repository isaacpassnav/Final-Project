const express = require("express");
const router = express.Router();
const hospitalController = require("../Controllers/hospitalController")
const ensureAuth = require("../middleware/authMiddleware.js");
const dataValidation = require("../middleware/dataValidations/hospitalValidation.js");

router.get("/", hospitalController.getAllHospitals);
router.get("/:id", hospitalController.getHospitalById);
router.post("/", ensureAuth, dataValidation.validateHospital, hospitalController.createHospital);
router.put("/:id", ensureAuth, dataValidation.validateHospital, hospitalController.updateHospital);
router.delete("/:id", ensureAuth, hospitalController.deleteHospital);

module.exports = router;
