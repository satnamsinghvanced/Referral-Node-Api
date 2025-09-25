import Joi from "joi";

export const docReferrerValidation = Joi.object({
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
});
