import Joi from "joi";
import mongoose from "mongoose";

const objectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message({ custom: "Invalid ObjectId format" });
    }
    return value;
  }, "ObjectId Validation");

export const docReferrerValidation = {
  create: Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": `"name" is required`,
    }),
    number: Joi.string().trim().required().messages({
      "string.empty": `"number" is required`,
    }),
    email: Joi.string().email().lowercase().trim().required().messages({
      "string.empty": `"email" is required`,
      "string.email": `"email" must be a valid email`,
    }),
    practiceName: Joi.string().trim().allow("").optional(),
    practiceAddress: Joi.string().trim().allow("").optional(),
    practiceType: Joi.string().trim().optional().allow(null, ""),
    notes: Joi.string().trim().allow("").optional(),
    isActive: Joi.boolean().optional(),
  }),

  update: Joi.object({
    name: Joi.string().trim().optional(),
    number: Joi.string().trim().optional(),
    email: Joi.string().email().lowercase().trim().optional().messages({
      "string.email": `"email" must be a valid email`,
    }),
    practiceName: Joi.string().trim().allow("").optional(),
    practiceAddress: Joi.string().trim().allow("").optional(),
    practiceType: Joi.string().trim().optional().allow(null, ""),
    notes: Joi.string().trim().allow("").optional(),
    isActive: Joi.boolean().optional(),
  }),
};
