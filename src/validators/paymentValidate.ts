
import Joi from "joi";
import { Types } from "mongoose";
import { VALIDATION_MESSAGES as M } from "../constant/payment.ts";

const paymentValidator = Joi.object({
  userId: Joi.string().messages({
    "string.base": M.USER_ID_STRING,
  }),

  subscriptionId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.required": M.SUBSCRIPTION_ID_REQUIRED,
      "any.invalid": M.SUBSCRIPTION_ID_INVALID,
    }),

  email: Joi.string().email().required().messages({
    "string.email": M.EMAIL_INVALID,
    "any.required": M.EMAIL_REQUIRED,
  }),

  amount: Joi.number().positive().required().messages({
    "number.base": M.AMOUNT_NUMBER,
    "number.positive": M.AMOUNT_POSITIVE,
    "any.required": M.AMOUNT_REQUIRED,
  }),

  currency: Joi.string().length(3).uppercase().default("USD").messages({
    "string.length": M.CURRENCY_LENGTH,
    "string.uppercase": M.CURRENCY_UPPERCASE,
  }),

  paymentMethod: Joi.string().required().messages({
    "string.base": M.PAYMENT_METHOD_STRING,
    "any.required": M.PAYMENT_METHOD_REQUIRED,
  }),

  status: Joi.string()
    .valid("pending", "succeeded", "failed")
    .default("pending")
    .messages({
      "any.only": M.STATUS_INVALID,
    }),

  transactionId: Joi.string().optional().messages({
    "string.base": M.TRANSACTION_ID_STRING,
  }),
});


export default paymentValidator;
  