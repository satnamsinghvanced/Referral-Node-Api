const express= require("express")
const patientController = require("./controller")

const router = express.Router();

router.post("/create", patientController.userCreate);
router.get("/all",patientController.allUser);
router.put("/status", patientController.userStatusUpdate);


module.exports = router;
