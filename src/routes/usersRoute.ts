import express from "express";
import userController from "../controllers/users/index.ts";
import auth from "../utils/middleware.ts";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/all", auth, userController.getAllUser);
userRouter.get("/user", auth, userController.getUserById);
userRouter.put("/user", auth, userController.updateUser);
userRouter.delete("/user", auth, userController.deleteUser);

export default userRouter;
 
