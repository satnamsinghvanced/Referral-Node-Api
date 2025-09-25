import Joi from "joi";
import { USER_VALIDATION_MESSAGES as UM } from "../constant/userMessage.ts";

const nameRegex = /^[A-Za-z\s.]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signupSchema = Joi.object({
  firstName: Joi.string()
    .pattern(nameRegex)
    .required()
    .messages(UM.FIRST_NAME),

  lastName: Joi.string()
    .pattern(nameRegex)
    .required()
    .messages(UM.LAST_NAME),

  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages(UM.EMAIL),

  password: Joi.string()
    .min(6)
    .required()
    .messages(UM.PASSWORD),

  mobile: Joi.string()
    .required()
    .messages(UM.MOBILE),

  practiceName: Joi.string()
    .optional()
    .messages(UM.PRACTICE_NAME),

  role: Joi.string()
    .required()
    .messages(UM.ROLE),

  subscriptionId: Joi.string()
    .optional()
    .messages(UM.SUBSCRIPTION_ERROR),

  medicalSpecialtyId: Joi.string()
    .optional()
    .messages(UM.MEDICAL_SPECIALTY),

  termsAccepted: Joi.boolean()
    .optional()
    .messages(UM.TERM_CONDITION_ERROR),
});


export const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages(UM.EMAIL),

  password: Joi.string()
    .required()
    .messages(UM.PASSWORD),
  rememberMe: Joi.boolean().optional()
});


export const updateUserSchema = Joi.object({
  firstName: Joi.string().pattern(nameRegex).optional().messages(UM.FIRST_NAME),
  lastName: Joi.string().pattern(nameRegex).optional().messages(UM.LAST_NAME),
  email: Joi.string().pattern(emailRegex).optional().messages(UM.EMAIL),
  password: Joi.string().min(6).optional().messages(UM.PASSWORD),
  mobile: Joi.string().optional().messages(UM.MOBILE),
  practiceName: Joi.string().optional().messages(UM.PRACTICE_NAME),
  role: Joi.string().optional().messages(UM.ROLE),
  medicalSpecialty: Joi.string().optional().messages(UM.MEDICAL_SPECIALTY),
});
