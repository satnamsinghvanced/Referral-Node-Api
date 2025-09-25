import PracticeType from "../models/practiceType.ts";
import { sendError, sendSuccess } from "../helper/responseHelpers.ts";
import { Request, Response } from "express";
import { PRACTICE_TYPE_MESSAGES as PTM } from "../constant/practiceType.ts";

class PracticeTypeController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const practiceTypes = await PracticeType.find();
      return sendSuccess(res, PTM.FETCH_ALL_SUCCESS, practiceTypes);
    } catch (error: any) {
      return sendError(res, PTM.SERVER_ERROR, error.message);
    }
  }

  static async get(req: Request, res: Response): Promise<Response> {
    try {
      const practiceType = await PracticeType.findById(req.params.id);
      if (!practiceType) return sendError(res, PTM.NOT_FOUND);
      return sendSuccess(res, PTM.FETCH_ONE_SUCCESS, practiceType);
    } catch (error: any) {
      return sendError(res, PTM.SERVER_ERROR, error.message);
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const practiceType = new PracticeType(req.body);
      await practiceType.save();
      return sendSuccess(res, PTM.CREATED, practiceType, 201);
    } catch (error: any) {
      if (error.code === 11000) {
        return sendError(res, PTM.CONFLICT_TITLE_EXISTS, undefined, 409);
      }
      return sendError(res, PTM.SERVER_ERROR, error.message);
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedPracticeType = await PracticeType.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedPracticeType) return sendError(res, PTM.NOT_FOUND);
      return sendSuccess(res, PTM.UPDATED, updatedPracticeType);
    } catch (error: any) {
      if (error.code === 11000) {
        return sendError(res, PTM.CONFLICT_TITLE_EXISTS, undefined, 409);
      }
      return sendError(res, PTM.SERVER_ERROR, error.message);
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deletedPracticeType = await PracticeType.findByIdAndDelete(req.params.id);
      if (!deletedPracticeType) return sendError(res, PTM.NOT_FOUND);
      return sendSuccess(res, PTM.DELETED);
    } catch (error: any) {
      return sendError(res, PTM.SERVER_ERROR, error.message);
    }
  }
}

export default PracticeTypeController;
