import express from "express";
import Permission from "../controllers/role/permission.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import { createPermissionSchema, updatePermissionSchema } from "../validators/permissionValidate.ts";
import { idParamSchema } from "../validators/idValidator.ts";
import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";

const permissionRoute = express.Router();

permissionRoute.get(CR.ROOT, Permission.getAll);
permissionRoute.get(CR.ID_PARAM, validateParams(idParamSchema), Permission.get)
permissionRoute.post(CR.ROOT, validateBody(createPermissionSchema), Permission.create);
permissionRoute.put(CR.ID_PARAM, validateParams(idParamSchema), validateBody(updatePermissionSchema), Permission.update);
permissionRoute.delete(CR.ID_PARAM, validateParams(idParamSchema), Permission.delete);

export default permissionRoute;
