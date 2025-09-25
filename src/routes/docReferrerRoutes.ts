import express from "express"
import referrerController from "../controllers/doctorReferrer/index.ts"
import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import { idParamSchema } from "../validators/subscriptionValidate.ts";
import { docReferrerValidation } from "../validators/docReferrerValidate.ts";
const docReferrerRoutes = express.Router();

docReferrerRoutes.get(CR.ROOT,referrerController.getDocReferrer)
docReferrerRoutes.post(CR.ID_PARAM,validateParams(idParamSchema),validateBody(docReferrerValidation),referrerController.addReferrerDoctor)
docReferrerRoutes.put(CR.ID_PARAM,validateParams(idParamSchema),validateBody(docReferrerValidation),referrerController.updateReferrerDoctor)
docReferrerRoutes.delete(CR.ID_PARAM,validateParams(idParamSchema),validateBody(docReferrerValidation),referrerController.deleteReferredDoctor)

export default docReferrerRoutes;