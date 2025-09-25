import Joi from "joi";
import { VALIDATION_MESSAGES as VM } from "../constant/permission.ts";

export const createPermissionSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9-_ ]+$/)
    .required()
    .messages({
      ...VM.PERMISSION.PERMISSION_NAME
    }),
});


export const updatePermissionSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9-_ ]+$/)
    .optional()
    .messages({
      ...VM.PERMISSION.PERMISSION_NAME
    }),
});

