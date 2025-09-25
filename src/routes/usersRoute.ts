import express from "express";
import userController from "../controllers/users/user.ts";
import { verifyToken , auth } from "../controllers/users/auth.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import {
  signupSchema,
  loginSchema,
  updateUserSchema,
} from "../validators/usersValidation.ts";
import { COMMON_ROUTES as CR, AUTH_ROUTE as AR } from "../helper/routehelper.ts";
import { idParamSchema } from "../validators/idValidator.ts";
import upload from "../config/upload/uploadSingle.ts";

const userRouter = express.Router();

userRouter.post(AR.REGISTER, upload.single("image"), validateBody(signupSchema), userController.signup);
userRouter.post(AR.LOGIN, validateBody(loginSchema), userController.login);
userRouter.post(AR.LOGOUT, verifyToken, validateParams(idParamSchema), userController.logout)
userRouter.post(AR.REFRESH_TOKEN, auth);

userRouter.get(CR.ROOT, verifyToken, userController.getAllUser);
userRouter.get(CR.ID_PARAM, verifyToken, validateParams(idParamSchema), userController.getUserById);
userRouter.put(CR.ID_PARAM, verifyToken, upload.single("image"), validateBody(updateUserSchema), userController.updateUser);
userRouter.delete(CR.ID_PARAM, verifyToken, validateParams(idParamSchema), userController.deleteUser);

export default userRouter;  