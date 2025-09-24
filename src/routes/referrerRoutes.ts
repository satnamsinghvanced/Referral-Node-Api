import express from "express"
import referrerController from "../controllers/referrer/index.ts"

const referrerRoutes = express.Router();

referrerRoutes.post("/addReferrerDoctor/:userId",referrerController.addReferrerDoctor)

export default referrerRoutes;