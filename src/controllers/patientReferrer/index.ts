import { Request, Response } from "express";
import patientReferrer from "../../models/patientReferrer.ts";
import { sendSuccess, sendError } from "../../helper/responseHelpers.ts";
import { PATIENT_REFERRER_MESSAGES } from "../../constant/patientReferrer.ts";
import User from "../../models/user.ts";
import { deleteById, validateEntityById } from "../../utils/validateEntityById.ts";
import { paginate } from "../../utils/pagination.ts";

export default {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await validateEntityById(User, req.params.id, res, PATIENT_REFERRER_MESSAGES.REFERRED_BY_NOT_FOUND);
      if (!user) return res;
      const existingReferrer = await patientReferrer.findOne({ email: req.body.email, referredBy: req.params.id });
      if (existingReferrer) { return sendError(res, PATIENT_REFERRER_MESSAGES.VALIDATION_ERROR, PATIENT_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS, 409); }
      const savedReferrer = await new patientReferrer({ referredBy: req.params.id, ...req.body, notes: req.body.notes || "", }).save();
      return sendSuccess(res, PATIENT_REFERRER_MESSAGES.CREATED, savedReferrer, 201);
    } catch (error: any) {
      return sendError(res, PATIENT_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { email } = req.body;
      const existingReferrer = await validateEntityById(patientReferrer, id, res, PATIENT_REFERRER_MESSAGES.NOT_FOUND);
      if (!existingReferrer) return res;
      if (email && email !== existingReferrer.email) {
        const emailExists = await patientReferrer.findOne({ email, _id: { $ne: id } });
        if (emailExists) { return sendError(res, PATIENT_REFERRER_MESSAGES.CONFLICT_EMAIL_EXISTS, undefined, 409); }
      }
      const updatedReferrer = await patientReferrer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, }).populate("referredBy", "name email");
      return sendSuccess(res, PATIENT_REFERRER_MESSAGES.UPDATED, updatedReferrer);
    } catch (error: any) {
      return sendError(res, PATIENT_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async delete(req: Request, res: Response): Promise<Response> {
    return deleteById(
      patientReferrer,
      req.params.id,
      res,
      PATIENT_REFERRER_MESSAGES.NOT_FOUND,
      PATIENT_REFERRER_MESSAGES.DELETED
    );
  },

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const paginationResult = await paginate(patientReferrer, page, limit, {},
        [{ path: "referredBy", select: "name email" }]
      );
      return sendSuccess(res, PATIENT_REFERRER_MESSAGES.FETCH_ALL_SUCCESS, paginationResult);
    } catch (error: any) {
      return sendError(
        res, PATIENT_REFERRER_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const referrer = await validateEntityById(
        patientReferrer,
        req.params.id,
        res,
        PATIENT_REFERRER_MESSAGES.NOT_FOUND
      );
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
