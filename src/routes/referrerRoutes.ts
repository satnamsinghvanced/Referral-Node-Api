import express from "express"
import referrerController from "../controllers/referrer/index.ts"

const referrerRoutes = express.Router();

referrerRoutes.post("/addReferrerDoctor/:userId",referrerController.addReferrerDoctor)
referrerRoutes.put("/updateReferrerDoctor/:referrerId",referrerController.updateReferrerDoctor)
referrerRoutes.delete("/deleteReferredDoctor/:referrerId",referrerController.deleteReferredDoctor)

export default referrerRoutes;