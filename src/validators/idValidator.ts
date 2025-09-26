import Joi from "joi";
import { VALIDATION_MESSAGES } from "../constant/subscription.ts";
import mongoose from "mongoose";

export const idParamSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES.ID_PARAM),
});


export const objectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message({ custom: "Invalid ObjectId format" });
    }
    return value;
  }, "ObjectId Validation");