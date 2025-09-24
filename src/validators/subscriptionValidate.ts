import Joi from "joi";
import { VALIDATION_MESSAGES } from "../constant/subscription.ts";

const priceSchema = Joi.object({
  daily: Joi.number()
    .min(0)
    .messages(VALIDATION_MESSAGES.PRICE.DAILY),
  monthly: Joi.number()
    .min(0)
    .messages(VALIDATION_MESSAGES.PRICE.MONTHLY),
  yearly: Joi.number()
    .min(0)
    .messages(VALIDATION_MESSAGES.PRICE.YEARLY),
  custom: Joi.string().trim().allow("", null).messages(VALIDATION_MESSAGES.PRICE.CUSTOM),
})
  .or("daily", "monthly", "yearly", "custom")
  .messages({
    "object.missing": VALIDATION_MESSAGES.PRICE.OR_MISSING,
  });

export const createSubscriptionSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .messages(VALIDATION_MESSAGES.SUBSCRIPTION.TITLE),
  description: Joi.string().trim().optional().allow(null, "").messages(VALIDATION_MESSAGES.SUBSCRIPTION.DESCRIPTION),
  price: priceSchema.required().messages({
    "any.required": VALIDATION_MESSAGES.SUBSCRIPTION.PRICE_REQUIRED,
  }),
  pointTitle: Joi.string().trim().optional().allow(null, "").messages(VALIDATION_MESSAGES.SUBSCRIPTION.POINT_TITLE),
  points: Joi.array()
    .items(Joi.string().trim().messages({ "string.base": VALIDATION_MESSAGES.SUBSCRIPTION.POINTS["string.base"] }))
    .optional()
    .messages({
      "array.base": VALIDATION_MESSAGES.SUBSCRIPTION.POINTS["array.base"],
    }),
});

export const updateSubscriptionSchema = Joi.object({
  title: Joi.string().trim().optional().messages(VALIDATION_MESSAGES.SUBSCRIPTION.TITLE),
  description: Joi.string().trim().optional().allow(null, "").messages(VALIDATION_MESSAGES.SUBSCRIPTION.DESCRIPTION),
  price: priceSchema.optional(),
  pointTitle: Joi.string().trim().optional().allow(null, "").messages(VALIDATION_MESSAGES.SUBSCRIPTION.POINT_TITLE),
  points: Joi.array()
    .items(Joi.string().trim().messages({ "string.base": VALIDATION_MESSAGES.SUBSCRIPTION.POINTS["string.base"] }))
    .optional()
    .messages({
      "array.base": VALIDATION_MESSAGES.SUBSCRIPTION.POINTS["array.base"],
    }),
}).min(1).messages({
  "object.min": VALIDATION_MESSAGES.SUBSCRIPTION.UPDATE_MIN,
});

export const idParamSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages(VALIDATION_MESSAGES.ID_PARAM),
});

