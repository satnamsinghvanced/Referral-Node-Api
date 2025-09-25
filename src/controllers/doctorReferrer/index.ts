import { Request, Response } from "express";
import docReferrer from "../../models/docReferrer.ts";
import QRCode from "qrcode";
import { sendSuccess, sendError } from "../../helper/responseHelpers.ts";
import { DOC_REFERRER_MESSAGES } from "../../constant/docReferrer.ts";
import User from "../../models/user.ts";
import mongoose from "mongoose";
import { validateEntityById } from "../../utils/validateEntityById.ts";
import { DocReferrerType } from "../../utils/type.ts";

export default {
  async getDocReferrer(req: Request, res: Response): Promise<Response> {
    try {
      const referrers = await docReferrer.find();
      return sendSuccess(
        res,
        DOC_REFERRER_MESSAGES.FETCH_ALL_SUCCESS,
        referrers
      );
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async addReferrerDoctor(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const {
        name,
        number,
        email,
        practiceName,
        practiceAddress,
        practiceType,
        notes,
      } = req.body;

      const referredByUser = await User.findById(id);
      if (!referredByUser) {
        return sendError(
          res,
          DOC_REFERRER_MESSAGES.REFERRING_USER_NOT_FOUND,
          undefined,
          404
        );
      }

      const existingReferrer = await docReferrer.findOne({
        email,
        referredBy: id,
      });
      if (existingReferrer) {
        return sendError(
          res,
          DOC_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS,
          undefined,
          409
        );
      }

      const newReferrer = new docReferrer({
        referredBy: id,
        name,
        number,
        email,
        practiceName: practiceName || "",
        practiceAddress: practiceAddress || "",
        practiceType: practiceType || undefined,
        notes: notes || "",
      });

      const savedReferrer = await newReferrer.save();
      const qrCodeDataUrl = await QRCode.toDataURL(
        JSON.stringify("https://practicemarketer.ai/referral/general")
      );
      // const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(`https://practicemarketer.ai/referral/general/${savedReferrer._id}`))
      savedReferrer.qrCode = qrCodeDataUrl;
      await savedReferrer.save();

      const populatedReferrer = await docReferrer
        .findById(savedReferrer._id)
        .populate("referredBy", "name email")
        .populate("practiceType", "name")
        .exec();

      return sendSuccess(
        res,
        DOC_REFERRER_MESSAGES.CREATED_MESSAGE,
        populatedReferrer,
        201
      );
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async updateReferrerDoctor(req: Request, res: Response): Promise<Response> {
    try {
      const existingReferrer = (await validateEntityById(
        docReferrer,
        req.params.id,
        res,
        DOC_REFERRER_MESSAGES.NOT_FOUND
      )) as DocReferrerType;
      
      if (!existingReferrer) return res;
      
      const updateData = req.body;

      if (updateData.email && updateData.email !== existingReferrer.email) {
        const emailExists = await docReferrer.findOne({
          email: updateData.email,
          _id: { $ne: req.params.id },
        });
        if (emailExists) {
          return sendError(
            res,
            DOC_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS,
            undefined,
            409
          );
        }
      }

      const updatedReferrer = await docReferrer
        .findByIdAndUpdate(req.params.id, updateData, {
          new: true,
          runValidators: true,
        })
        .populate("referredBy", "name email")
        .populate("practiceType", "name");

      return sendSuccess(
        res,
        DOC_REFERRER_MESSAGES.UPDATED_MESSAGE,
        updatedReferrer
      );
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async deleteReferredDoctor(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return sendError(res, DOC_REFERRER_MESSAGES.MISSING_ID);
      }
      const deletedUser = await docReferrer.findByIdAndDelete(id);
      if (!deletedUser) {
        return sendError(res, DOC_REFERRER_MESSAGES.NOT_FOUND);
      }
      return sendSuccess(
        res,
        DOC_REFERRER_MESSAGES.DELETED_MESSAGE,
        deletedUser
      );
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },
};
