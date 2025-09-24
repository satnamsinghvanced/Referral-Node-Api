import express from "express";
import userController from "../controllers/users/index.ts";
import auth from "../utils/middleware.ts";
import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/", auth, userController.getAllUser);
userRouter.get("/:id", auth, userController.getUserById);
userRouter.put("/", auth, userController.updateUser);
userRouter.delete("/", auth, userController.deleteUser);

export default userRouter;
 
