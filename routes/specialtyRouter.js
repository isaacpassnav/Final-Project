const express = require("express");
const router = express.Router();
const specialtyController = require("../Controllers/specialtyController")

router.get("/", specialtyController.getAllSpecialties);

router.get("/:id", specialtyController.getSpecialtyById);

router.post("/", specialtyController.createSpecialty);

router.put("/:id", specialtyController.updateSpecialty);

router.delete("/:id", specialtyController.deleteSpecialty);

module.exports = router;
