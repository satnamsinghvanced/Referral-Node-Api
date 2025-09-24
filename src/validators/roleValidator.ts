import Joi from "joi";
import { VALIDATION_MESSAGES as VS } from "../constant/role.ts";

export const createRoleSchema = Joi.object({
  role: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9-_ ]+$/)
    .required()
    .messages({
      ...VS.ROLE.ROLE_NAME,
    }),
  description: Joi.string()
    .allow("")
    .optional()
    .messages({
      ...VS.ROLE.DESCRIPTION,
    }),
});

export const updateRoleSchema = Joi.object({
  role: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9-_ ]+$/)
    .optional()
    .messages({
      ...VS.ROLE.ROLE_NAME,
    }),
  description: Joi.string()
    .trim()
    .allow("")
    .optional()
    .messages({
      ...VS.ROLE.DESCRIPTION,
    }),
});
