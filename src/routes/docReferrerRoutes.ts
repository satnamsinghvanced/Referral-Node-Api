import express from "express"
import referrerController from "../controllers/doctorReferrer/index.ts"
import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import { idParamSchema } from "../validators/idValidator.ts";
import { docReferrerValidation } from "../validators/docReferrerValidate.ts";

const docReferrerRoutes = express.Router();

docReferrerRoutes.get(CR.ROOT, referrerController.getAll)
docReferrerRoutes.get(CR.ID_PARAM, referrerController.get)
docReferrerRoutes.post(CR.ID_PARAM, validateParams(idParamSchema), validateBody(docReferrerValidation.create), referrerController.create)
docReferrerRoutes.put(CR.ID_PARAM, validateParams(idParamSchema), validateBody(docReferrerValidation.update), referrerController.update)
docReferrerRoutes.delete(CR.ID_PARAM, validateParams(idParamSchema), referrerController.delete)

export default docReferrerRoutes;