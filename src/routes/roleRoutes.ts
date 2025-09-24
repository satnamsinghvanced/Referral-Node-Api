import express from "express";
import roleController from "../controllers/role/index.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import { createRoleSchema, roleParamSchema, updateRoleSchema } from "../validators/roleValidator.ts";
import { idParamSchema } from "../validators/subscriptionValidate.ts";

const roleRouter = express.Router();

roleRouter.post("/addRole",validateBody(createRoleSchema),roleController.addRole)
roleRouter.put("/updateRole/:id",validateParams(idParamSchema),validateBody(updateRoleSchema),roleController.updateRole)
roleRouter.delete("/deleteRole/:id",validateParams(idParamSchema),roleController.deleteRole)
roleRouter.get("/getAllRoles",roleController.getAllRoles)
roleRouter.get("/getRoleWithPermissions/:role",validateParams(roleParamSchema),roleController.getRoleWithPermissions)

export default roleRouter