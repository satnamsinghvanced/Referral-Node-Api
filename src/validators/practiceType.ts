import Joi from "joi";
import { VALIDATION_MESSAGES as VM } from "../constant/practiceType.ts";

export const createPracticeTypeSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9-_ ]+$/)
    .required()
    .messages({
      ...VM.PRACTICE_TYPE.TITLE,
    }),
  description: Joi.string().allow("").optional(),
});


export const updatePracticeTypeSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9-_ ]+$/)
    .optional()
    .messages({
      ...VM.PRACTICE_TYPE.TITLE,
    }),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid("active", "inactive").optional(),
});
