import express from "express";
import patientController from "../controllers/patientReferrer/index.ts";
import { patientReferrerValidation } from "../validators/patientReferrerValidate.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";
import { idParamSchema } from "../validators/idValidator.ts";

const patientReferrerRoutes = express.Router();

patientReferrerRoutes.post(CR.ID_PARAM, validateParams(idParamSchema), validateBody(patientReferrerValidation.create), patientController.create)
patientReferrerRoutes.put(CR.ID_PARAM, validateParams(idParamSchema), validateBody(patientReferrerValidation.update), patientController.update)
patientReferrerRoutes.delete(CR.ID_PARAM, validateParams(idParamSchema), patientController.delete)
patientReferrerRoutes.get(CR.ID_PARAM, validateParams(idParamSchema), patientController.get)
patientReferrerRoutes.get(CR.ROOT, patientController.getAll)

export default patientReferrerRoutes;