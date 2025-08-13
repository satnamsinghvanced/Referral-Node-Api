const express= require("express")
const userController = require("./controller")

const router = express.Router();

router.post("/create", userController.userCreate);
router.get("/all",userController.allUser)


module.exports = router;
