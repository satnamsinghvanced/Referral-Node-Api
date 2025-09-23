import express from "express";
import subscriptionRoute from "./subscriptionRoute.ts";
const router = express.Router();

router.use("/subscriptions", subscriptionRoute);

export default router;
