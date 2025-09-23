import Joi from "joi";
import { VALIDATION_MESSAGES } from "../constant/subscription.ts";

export const idParamSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES.ID_PARAM),
});
