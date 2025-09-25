import express from "express"
import referrerController from "../controllers/doctorReferrer/index.ts"

const docReferrerRoutes = express.Router();

docReferrerRoutes.get("/getDocReferrer",referrerController.getDocReferrer)
docReferrerRoutes.post("/addReferrerDoctor/:userId",referrerController.addReferrerDoctor)
docReferrerRoutes.put("/updateReferrerDoctor/:referrerId",referrerController.updateReferrerDoctor)
docReferrerRoutes.delete("/deleteReferredDoctor/:referrerId",referrerController.deleteReferredDoctor)

export default docReferrerRoutes;