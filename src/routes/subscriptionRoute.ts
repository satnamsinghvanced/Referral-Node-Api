import express from "express";
import SubscriptionController from "../controllers/subscription/subscription.ts";
import { createSubscriptionSchema, updateSubscriptionSchema } from "../validators/subscriptionValidate.ts";
import {idParamSchema } from "../validators/idValidator.ts"
import { validateBody, validateParams } from "../validators/validator.ts";

const subscriptionRoute = express.Router();

subscriptionRoute.get("/", SubscriptionController.getAll);
subscriptionRoute.get("/:id", validateParams(idParamSchema), SubscriptionController.getOne);
subscriptionRoute.post("/", validateBody(createSubscriptionSchema), SubscriptionController.create);
subscriptionRoute.patch("/:id", validateParams(idParamSchema), validateBody(updateSubscriptionSchema), SubscriptionController.update);
subscriptionRoute.delete("/:id", validateParams(idParamSchema), SubscriptionController.delete);

export default subscriptionRoute;
