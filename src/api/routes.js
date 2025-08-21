const express = require("express");
const router = express.Router();
const patientRoutes = require("../api/user/route");

router.use("/patient", patientRoutes);

module.exports = router;