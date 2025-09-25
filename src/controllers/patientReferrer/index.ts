import { Request, Response } from "express";
import patientReferrer from "../../models/patientReferrer.ts";
import { sendSuccess, sendError } from "../../helper/responseHelpers.ts";
import { PATIENT_REFERRER_MESSAGES } from "../../constant/patientReferrer.ts";
import mongoose from "mongoose";
import User from "../../models/user.ts";

export default {
  async addReferrerPatient(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const referringUser = await User.findById(req.params.id);
      if (!referringUser) {
        return sendError(
          res,
          PATIENT_REFERRER_MESSAGES.REFERRED_BY_NOT_FOUND,
          undefined,
          404
        );
      }
      const { name, number, email, notes } = req.body;

      const existingReferrer = await patientReferrer.findOne({
        email,
        referredBy: id,
      });
      if (existingReferrer) {
        return sendError(
          res,
          PATIENT_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS,
          undefined,
          409
        );
      }

      const newReferrer = new patientReferrer({
        referredBy: id,
        name,
        number,
        email,
        notes: notes || "",
      });

      const savedReferrer = await newReferrer.save();
      return sendSuccess(
        res,
        PATIENT_REFERRER_MESSAGES.CREATED,
        savedReferrer,
        201
      );
    } catch (error: any) {
      return sendError(
        res,
        PATIENT_REFERRER_MESSAGES.SERVER_ERROR,
        error.message
      );
    }
  },

  async updateReferrerPatient(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, number, email, notes, isActive } = req.body;

      const existingReferrer = await patientReferrer.findById(id);
      if (!existingReferrer) {
        return sendError(
          res,
          PATIENT_REFERRER_MESSAGES.NOT_FOUND,
          undefined,
          404
        );
      }

      if (email && email !== existingReferrer.email) {
        const emailExists = await patientReferrer.findOne({
          email,
          _id: { $ne: id },
        });
        if (emailExists) {
          return sendError(
            res,
            PATIENT_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS,
            undefined,
            409
          );
        }
      }

      const updateData = req.body;
    
      const updatedReferrer = await patientReferrer
        .findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        })
        .populate("referredBy", "name email");

      return sendSuccess(
        res,
        PATIENT_REFERRER_MESSAGES.UPDATED,
        updatedReferrer
      );
    } catch (error: any) {
      return sendError(
        res,
        PATIENT_REFERRER_MESSAGES.SERVER_ERROR,
        error.message
      );
    }
  },

  async deleteReferrerPatient(req: Request, res: Response): Promise<Response> {
    try {
      const deletedReferrer = await patientReferrer.findByIdAndDelete(
        req.params.id
      );
      if (!deletedReferrer) {
        return sendError(
          res,
          PATIENT_REFERRER_MESSAGES.NOT_FOUND,
          undefined,
          404
        );
      }

      return sendSuccess(
        res,
        PATIENT_REFERRER_MESSAGES.DELETED,
        deletedReferrer
      );
    } catch (error: any) {
      return sendError(
        res,
        PATIENT_REFERRER_MESSAGES.SERVER_ERROR,
        error.message
      );
    }
  },

  async getReferrerPatients(req: Request, res: Response): Promise<Response> {
    try {
      const referrers = await patientReferrer
        .find()
        .populate("referredBy", "name email");

      return sendSuccess(
        res,
        PATIENT_REFERRER_MESSAGES.FETCH_ALL_SUCCESS,
        referrers
      );
    } catch (error: any) {
      return sendError(
        res,
        PATIENT_REFERRER_MESSAGES.SERVER_ERROR,
        error.message
      );
    }
  },

  async getReferrerPatient(req: Request, res: Response): Promise<Response> {
    try {
      const referrer = await patientReferrer
        .findById(req.params.id)
        .populate("referredBy", "name email");

      if (!referrer) {
        return sendError(
          res,
          PATIENT_REFERRER_MESSAGES.NOT_FOUND,
          undefined,
          404
        );
      }

      return sendSuccess(
        res,
        PATIENT_REFERRER_MESSAGES.FETCH_ONE_SUCCESS,
        referrer
      );
    } catch (error: any) {
      return sendError(
        res,
        PATIENT_REFERRER_MESSAGES.SERVER_ERROR,
        error.message
      );
    }
  },
};
