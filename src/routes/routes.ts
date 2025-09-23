import express from "express";
import userRouter from "./usersRoute.ts";
import subscriptionRoute from "./subscriptionRoute.ts";

const router = express.Router();

router.use("/users",userRouter)
router.use("/subscriptions", subscriptionRoute);

export default router;
