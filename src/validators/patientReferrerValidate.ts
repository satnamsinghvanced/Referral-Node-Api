import Joi from "joi";
import mongoose from "mongoose";

// ObjectId custom validation
const objectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message({ custom: "Invalid ObjectId format" });
    }
    return value;
  }, "ObjectId Validation");

export const patientReferrerValidation = {
  create: Joi.object({
    name: Joi.string().trim().required().messages({
      "any.required": "Name is required.",
      "string.empty": "Name cannot be empty.",
    }),
    number: Joi.string().trim().required().messages({
      "any.required": "Number is required.",
      "string.empty": "Number cannot be empty.",
    }),
    email: Joi.string().email().trim().required().messages({
      "any.required": "Email is required.",
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email cannot be empty.",
    }),
    notes: Joi.string().allow("").optional(),
    isActive: Joi.boolean().optional(),
    status: Joi.string()
      .valid("New", "Schedule", "Completed")
      .optional()
      .messages({
        "any.only": "Status must be one of: New, Schedule, Completed.",
      }),
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
