import express from "express";
import PracticeTypeController from "../controllers/practiceType.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import { createPracticeTypeSchema, updatePracticeTypeSchema } from "../validators/practiceType.ts";
import { idParamSchema } from "../validators/idValidator.ts";
import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";

const practiceType = express.Router();

practiceType.get(CR.ROOT, PracticeTypeController.getAll);
practiceType.get(CR.ID_PARAM, validateParams(idParamSchema), PracticeTypeController.get)
practiceType.post(CR.ROOT, validateBody(createPracticeTypeSchema), PracticeTypeController.create);
practiceType.put(CR.ID_PARAM, validateParams(idParamSchema), validateBody(updatePracticeTypeSchema), PracticeTypeController.update);
practiceType.delete(CR.ID_PARAM, validateParams(idParamSchema), PracticeTypeController.delete);

export default practiceType;
