const express = require("express");
const router = express.Router();
const specialtyController = require("../Controllers/specialtyController");
const ensureAuth = require("../middleware/authMiddleware");

router.get("/", specialtyController.getAllSpecialties);

router.get("/:id", specialtyController.getSpecialtyById);

router.post("/", ensureAuth, specialtyController.createSpecialty);

router.put("/:id", ensureAuth, specialtyController.updateSpecialty);

router.delete("/:id", ensureAuth, specialtyController.deleteSpecialty);

module.exports = router;
