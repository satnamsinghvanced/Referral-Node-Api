import express from "express";
import userRouter from "./usersRoute.ts";
import subscriptionRoute from "./subscriptionRoute.ts";
import paymentRoute from "./paymentRoute.ts"
const router = express.Router();

router.use("/users",userRouter)
router.use("/subscriptions", subscriptionRoute);
router.use("/payment", paymentRoute);

export default router;
