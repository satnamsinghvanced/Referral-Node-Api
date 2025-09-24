import express from "express";
import userRouter from "./usersRoute.ts";
import subscriptionRoute from "./subscriptionRoute.ts";
import paymentRoute from "./paymentRoute.ts"
import roleRouter from "./roleRoutes.ts";
const router = express.Router();

router.use("/users",userRouter)
router.use("/subscriptions", subscriptionRoute);
router.use("/payment", paymentRoute);
router.use("/role",roleRouter)

export default router
