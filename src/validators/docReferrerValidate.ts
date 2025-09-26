import Joi from "joi";
import { objectId } from "./idValidator.ts";
import { DOCTOR_REFERRER_VALIDATION as DRV } from "../constant/docReferrer.ts";

export const docReferrerValidation = {
  create: Joi.object({
    name: Joi.string().trim().required().messages(DRV.NAME),
    number: Joi.string().trim().required().messages(DRV.NUMBER),
    email: Joi.string().email().lowercase().trim().required().messages(DRV.EMAIL),
    practiceName: Joi.string().trim().allow("").optional(),
    practiceAddress: Joi.string().trim().allow("").optional(),
    practiceType: objectId().required().messages(DRV.PRACTICE_TYPE),
    notes: Joi.string().trim().allow("").optional(),
    isActive: Joi.boolean().optional(),
    status: Joi.string().valid("New", "Schedule", "Completed").optional(),
    addedVia: Joi.string().valid("QR", "NFC", "Manual").optional(),
  }),

  update: Joi.object({
    name: Joi.string().trim().optional(),
    number: Joi.string().trim().optional(),
    email: Joi.string().email().lowercase().trim().optional().messages(DRV.EMAIL_OPTIONAL),
    practiceName: Joi.string().trim().allow("").optional(),
    practiceAddress: Joi.string().trim().allow("").optional(),
    practiceType: objectId().optional().allow(null, ""),
    notes: Joi.string().trim().allow("").optional(),
    isActive: Joi.boolean().optional(),
    status: Joi.string().valid("New", "Schedule", "Completed").optional(),
    addedVia: Joi.string().valid("QR", "NFC", "Manual").optional(),
  }),
};
