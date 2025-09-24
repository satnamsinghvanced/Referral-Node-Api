import express from "express";
import userController from "../controllers/users/user.ts";
import auth from "../middleware/auth.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import {
  signupSchema,
  loginSchema,
  updateUserSchema,
  userIdParamSchema,
} from "../validators/usersValidation.ts";

import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";


const userRouter = express.Router();

userRouter.post("/signup", validateBody(signupSchema), userController.signup);
userRouter.post("/login", validateBody(loginSchema), userController.login);

userRouter.get(CR.ROOT, auth, userController.getAllUser);
userRouter.get(CR.ID_PARAM, auth,validateBody(userIdParamSchema),userController.getUserById);
userRouter.put(CR.ROOT,auth,validateBody(updateUserSchema),userController.updateUser);
userRouter.delete(CR.ID_PARAM,auth,validateBody(userIdParamSchema),userController.deleteUser);

export default userRouter;
