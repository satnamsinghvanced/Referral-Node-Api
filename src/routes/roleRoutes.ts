import express from "express";
import roleController from "../controllers/role/index.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import { createRoleSchema, updateRoleSchema } from "../validators/roleValidator.ts";
import { idParamSchema } from "../validators/idValidator.ts";
import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";

const roleRouter = express.Router();

roleRouter.get(CR.ROOT, roleController.getAll);
roleRouter.get(CR.ID_PARAM, validateParams(idParamSchema), roleController.get)
roleRouter.post(CR.ROOT, validateBody(createRoleSchema), roleController.addRole);
roleRouter.put(CR.ID_PARAM, validateParams(idParamSchema), validateBody(updateRoleSchema), roleController.updateRole);
roleRouter.delete(CR.ID_PARAM, validateParams(idParamSchema), roleController.deleteRole);

export default roleRouter;
