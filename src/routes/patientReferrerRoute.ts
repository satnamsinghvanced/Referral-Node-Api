import express from "express";
import patientController from "../controllers/patientReferrer/index.ts";

const patientReferrerRoutes = express.Router();

patientReferrerRoutes.post("/addReferrerPatient/:userId",patientController.addReferrerPatient)
patientReferrerRoutes.post("/updateReferrerPatient/:userId",patientController.updateReferrerPatient)

export default patientReferrerRoutes;