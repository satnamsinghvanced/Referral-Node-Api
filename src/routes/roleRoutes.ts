import express from "express";
import roleController from "../controllers/role/index.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import { createRoleSchema, updateRoleSchema } from "../validators/roleValidator.ts";
import { idParamSchema } from "../validators/idValidator.ts";

const roleRouter = express.Router();

roleRouter.get("/", roleController.getAll);
roleRouter.get("/:id", validateParams(idParamSchema), roleController.get)
roleRouter.post("/", validateBody(createRoleSchema), roleController.addRole);
roleRouter.put("/:id", validateParams(idParamSchema), validateBody(updateRoleSchema), roleController.updateRole);
roleRouter.delete("/:id", validateParams(idParamSchema), roleController.deleteRole);

export default roleRouter;
