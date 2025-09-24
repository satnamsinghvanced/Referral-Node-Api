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

const userRouter = express.Router();

userRouter.post("/signup", validateBody(signupSchema), userController.signup);
userRouter.post("/login", validateBody(loginSchema), userController.login);

userRouter.get("/all", auth, userController.getAllUser);
userRouter.get(
  "/user",
  auth,
  validateBody(userIdParamSchema),
  userController.getUserById
);
userRouter.put(
  "/user",
  auth,
  validateBody(updateUserSchema),
  userController.updateUser
);
userRouter.delete(
  "/user",
  auth,
  validateBody(userIdParamSchema),
  userController.deleteUser
);

export default userRouter;
