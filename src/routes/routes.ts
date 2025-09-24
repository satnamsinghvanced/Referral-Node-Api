import express from "express";
import { ROUTES as R } from "../helper/routehelper.ts"
import userRouter from "./usersRoute.ts";
import subscriptionRoute from "./subscriptionRoute.ts";
import paymentRoute from "./paymentRoute.ts"
import roleRouter from "./roleRoutes.ts";
import permissionRoute from "./permission.ts";
import practiceType from "./practiceType.ts";

const router = express.Router();

router.use(R.USERS, userRouter);
router.use(R.SUBSCRIPTIONS, subscriptionRoute);
router.use(R.PAYMENTS, paymentRoute);
router.use(R.ROLES, roleRouter);
router.use(R.PERMISSION, permissionRoute);
router.use(R.PRACTICE_TYPE, practiceType);

export default router
