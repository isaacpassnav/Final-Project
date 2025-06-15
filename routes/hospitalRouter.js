const express = require("express");
const router = express.Router();
const hospitalController = require("../Controllers/hospitalController")
const ensureAuth = require("../middleware/authMiddleware.js");

router.get("/", hospitalController.getAllHospitals);
router.get("/:id", hospitalController.getHospitalById);
router.post("/", ensureAuth, hospitalController.createHospital);
router.put("/:id", ensureAuth, hospitalController.updateHospital);
router.delete("/:id", ensureAuth, hospitalController.deleteHospital);

module.exports = router;
