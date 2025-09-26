import Joi from "joi";
import mongoose from "mongoose";
import { PATIENT_REFERRER_VALIDATION as PRV } from "../constant/patientReferrer.ts";
import { objectId } from "./idValidator.ts";

export const patientReferrerValidation = {
  create: Joi.object({
    name: Joi.string().trim().required().messages(PRV.NAME),
    number: Joi.string().trim().required().messages(PRV.NUMBER),
    email: Joi.string().email().lowercase().trim().required().messages(PRV.EMAIL),
    notes: Joi.string().trim().allow("").optional(),
    isActive: Joi.boolean().optional(),
    status: Joi.string().valid("New", "Schedule", "Completed").optional(),
    addedVia: Joi.string().valid("QR", "NFC", "Manual").optional(),
    type: Joi.string().required().optional(),
    referrals: Joi.array().items(objectId()).optional(),
    referralStats: Joi.object({
      total: Joi.number().min(0).optional(),
      thisMonth: Joi.number().min(0).optional(),
    }).optional(),
  }),

  update: Joi.object({
    name: Joi.string().trim().optional(),
    number: Joi.string().trim().optional(),
    email: Joi.string().email().lowercase().trim().optional().messages(PRV.EMAIL_OPTIONAL),
    notes: Joi.string().trim().allow("").optional(),
    isActive: Joi.boolean().optional(),
    status: Joi.string().valid("New", "Schedule", "Completed").optional(),
    addedVia: Joi.string().valid("QR", "NFC", "Manual").optional(),
    type: Joi.string().required().optional(),
  }),
};
