const express = require("express");
const router = express.Router();

router.use('/', require('./swagger'));
router.use("/doctors", require("./doctorRouter"));
router.use("/specialties", require("./specialtyRouter"));
router.use("/hospital", require("./hospitalRouter"));
router.use("/users", require("./userRouter"));

module.exports = router;