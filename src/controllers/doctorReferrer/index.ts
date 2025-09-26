import { Request, Response } from "express";
import docReferrer from "../../models/docReferrer.ts";
import QRCode from "qrcode";
import { sendSuccess, sendError } from "../../helper/responseHelpers.ts";
import { DOC_REFERRER_MESSAGES } from "../../constant/docReferrer.ts";
import User from "../../models/user.ts";
import { deleteById, validateEntityById } from "../../utils/validateEntityById.ts";
import { paginate } from "../../utils/pagination.ts";
import dotenv from "dotenv";
dotenv.config();

const FRONTEND_URL = process.env.REFERRAL_URL;
export default {

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const paginationResult = await paginate(docReferrer, page, limit, {},
        ["referredBy", "practiceType", "referrals"]
      );
      return sendSuccess(
        res,
        DOC_REFERRER_MESSAGES.FETCH_ALL_SUCCESS,
        paginationResult
      );
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const doctor = await docReferrer.findById(req.params.id)
        .populate("referredBy")
        .populate("practiceType")
        .populate("referrals")
      if (!doctor) {
        return sendError(res, DOC_REFERRER_MESSAGES.NOT_FOUND, undefined, 404);
      }
      return sendSuccess(res, DOC_REFERRER_MESSAGES.FETCH_ALL_SUCCESS, doctor);
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id: referredBy } = req.params;
      const user = await validateEntityById(User, referredBy, res, DOC_REFERRER_MESSAGES.REFERRING_USER_NOT_FOUND);
      if (!user) return res;

      const existing = await docReferrer.findOne({ email: req.body.email, referredBy });
      if (existing) {
        return sendError(res, DOC_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS, undefined, 409);
      }

      const newReferrer = new docReferrer({
        ...req.body,
        referredBy,
      });

      const referralUrl = `${FRONTEND_URL}/${newReferrer._id}`;
      newReferrer.qrCode = await QRCode.toDataURL(referralUrl);
      const saved = await newReferrer.save();

      const populated = await docReferrer.findById(saved._id)
        .populate("referredBy")
        .populate("practiceType");

      return sendSuccess(res, DOC_REFERRER_MESSAGES.CREATED_MESSAGE, populated, 201);
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id: referrerId } = req.params;
      const updateData = req.body;

      const existingReferrer = (await validateEntityById(docReferrer, referrerId, res, DOC_REFERRER_MESSAGES.NOT_FOUND)) as any | null;
      if (!existingReferrer) return res;

      if (updateData.email && updateData.email !== existingReferrer.email) {
        const emailExists = await docReferrer.findOne({
          email: updateData.email,
          _id: { $ne: referrerId },
        });
        if (emailExists) return sendError(res, DOC_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS, undefined, 409);
      }

      const updatedReferrer = await docReferrer.findByIdAndUpdate(
        referrerId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedReferrer) return sendError(res, DOC_REFERRER_MESSAGES.NOT_FOUND, undefined, 404);

      const referralUrl = `${FRONTEND_URL}/${updatedReferrer._id}`;
      updatedReferrer.qrCode = await QRCode.toDataURL(referralUrl);
      await updatedReferrer.save();

      const populatedReferrer = await docReferrer.findById(updatedReferrer._id)
        .populate("referredBy")
        .populate("practiceType");

      return sendSuccess(res, DOC_REFERRER_MESSAGES.UPDATED_MESSAGE, populatedReferrer);
    } catch (error: any) {
      return sendError(res, DOC_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async delete(req: Request, res: Response): Promise<Response> {
    return deleteById(
      docReferrer,
      req.params.id,
      res,
      DOC_REFERRER_MESSAGES.NOT_FOUND,
      DOC_REFERRER_MESSAGES.DELETED_MESSAGE
    );
  }
};  
