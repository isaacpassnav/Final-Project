const express = require("express");
const router = express.Router();
const specialtyController = require("../Controllers/specialtyController");
const ensureAuth = require("../middleware/authMiddleware");
const dataValidation = require("../middleware/dataValidations/specialtyValidation");

router.get("/", specialtyController.getAllSpecialties);

router.get("/:id", specialtyController.getSpecialtyById);

router.post("/", ensureAuth, dataValidation.validateSpecialty, specialtyController.createSpecialty);

router.put("/:id", ensureAuth, dataValidation.validateSpecialty, specialtyController.updateSpecialty);

router.delete("/:id", ensureAuth, specialtyController.deleteSpecialty);

module.exports = router;
