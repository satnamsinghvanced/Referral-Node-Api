import { Request, Response } from "express";
import docReferrer from "../../models/docReferrer.ts";
import QRCode from "qrcode";
import { sendSuccess, sendError } from "../../helper/responseHelpers.ts";
import { DOC_REFERRER_MESSAGES } from "../../constant/docReferrer.ts"; // You can create this constants file similar to ROLE_MESSAGES

export default {
  async getDocReferrer(req: Request, res: Response): Promise<Response> {
    try {
      const referrers = await docReferrer.find();
      return sendSuccess(res, DOC_REFERRER_MESSAGES.FETCH_ALL_SUCCESS, referrers);
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

      if (!name || !number || !email) {
        return sendError(res, DOC_REFERRER_MESSAGES.REQUIRED_FIELDS);
      }

      const existingReferrer = await docReferrer.findOne({ email });
      if (existingReferrer) {
        return sendError(res, DOC_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS, undefined, 409);
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

      return sendSuccess(res, DOC_REFERRER_MESSAGES.CREATED_MESSAGE, populatedReferrer, 201);
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async updateReferrerDoctor(req: Request, res: Response): Promise<Response> {
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
        isActive,
      } = req.body;

      const existingReferrer = await docReferrer.findById(id);
      if (!existingReferrer) {
        return sendError(res, DOC_REFERRER_MESSAGES.NOT_FOUND);
      }

      if (email && email !== existingReferrer.email) {
        const emailExists = await docReferrer.findOne({
          email,
          _id: { $ne: id },
        });
        if (emailExists) {
          return sendError(res, DOC_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS, undefined, 409);
        }
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (number) updateData.number = number;
      if (email) updateData.email = email;
      if (practiceName !== undefined) updateData.practiceName = practiceName;
      if (practiceAddress !== undefined) updateData.practiceAddress = practiceAddress;
      if (practiceType !== undefined) updateData.practiceType = practiceType;
      if (notes !== undefined) updateData.notes = notes;
      if (isActive !== undefined) updateData.isActive = isActive;

      const updatedReferrer = await docReferrer
        .findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        })
        .populate("referredBy", "name email")
        .populate("practiceType", "name");

      return sendSuccess(res, DOC_REFERRER_MESSAGES.UPDATED_MESSAGE, updatedReferrer);
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
      return sendSuccess(res, DOC_REFERRER_MESSAGES.DELETED_MESSAGE,deletedUser);
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },
};
