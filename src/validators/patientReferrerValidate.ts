import Joi from "joi";
import mongoose from "mongoose";
    
const objectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "ObjectId Validation");

export const patientReferrerValidation = {
  create: Joi.object({
    name: Joi.string().trim().required(),
    number: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    notes: Joi.string().allow("").optional(),
    isActive: Joi.boolean().optional(),
    status: Joi.string().valid("New", "Schedule", "Completed").optional(),
  }),

  update: Joi.object({
    name: Joi.string().trim().optional(),
    number: Joi.string().trim().optional(),
    email: Joi.string().email().trim().optional(),
    notes: Joi.string().allow("").optional(),
    isActive: Joi.boolean().optional(),
    status: Joi.string().valid("New", "Schedule", "Completed").optional(),
  }),
};
