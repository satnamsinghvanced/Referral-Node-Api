import express from "express";
import SubscriptionController from "../controllers/subscription/subscription.ts";
import {
  createSubscriptionSchema,
  updateSubscriptionSchema,
} from "../validators/subscriptionValidate.ts";
import { idParamSchema } from "../validators/idValidator.ts";
import { validateBody, validateParams } from "../validators/validator.ts";
import { COMMON_ROUTES as CR } from "../helper/routehelper.ts";
const subscriptionRoute = express.Router();

subscriptionRoute.get(CR.ROOT, SubscriptionController.getAll);
subscriptionRoute.get(
  CR.ID_PARAM,
  validateParams(idParamSchema),
  SubscriptionController.getOne
);
subscriptionRoute.post(
  CR.ROOT,
  validateBody(createSubscriptionSchema),
  SubscriptionController.create
);
subscriptionRoute.patch(
  CR.ID_PARAM,
  validateParams(idParamSchema),
  validateBody(updateSubscriptionSchema),
  SubscriptionController.update
);
subscriptionRoute.delete(
  CR.ID_PARAM,
  validateParams(idParamSchema),
  SubscriptionController.delete
);

export default subscriptionRoute;
