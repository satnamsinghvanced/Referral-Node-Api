import Permissions from "../../models/permissions.ts";
import { sendError, sendSuccess } from "../../helper/responseHelpers.ts";
import { Request, Response } from "express";
import { PERMISSION_MESSAGES as PM } from "../../constant/permission.ts";

class Permission {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const permissions = await Permissions.find();
      return sendSuccess(res, PM.FETCH_ALL_SUCCESS, permissions);
    } catch (error: any) {
      return sendError(res, PM.SERVER_ERROR, error.message);
    }
  }

  static async get(req: Request, res: Response): Promise<Response> {
    try {
      const permission = await Permissions.findById(req.params.id);
      if (!permission) return sendError(res, PM.NOT_FOUND);
      return sendSuccess(res, PM.FETCH_ONE_SUCCESS, permission);
    } catch (error: any) {
      return sendError(res, PM.SERVER_ERROR, error.message);
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const permission = new Permissions(req.body);
      await permission.save();
      return sendSuccess(res, PM.CREATED_MESSAGE, permission, 201);
    } catch (error: any) {
      if (error.code === 11000) {
        return sendError(res, PM.VALIDATION_ERROR, PM.CONFLICT_TITLE_EXISTS, 409);
      }
      return sendError(res, PM.SERVER_ERROR, error.message);
    }
  }


  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedPermission = await Permissions.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedPermission) return sendError(res, PM.NOT_FOUND);
      return sendSuccess(res, PM.UPDATED_MESSAGE, updatedPermission);
    } catch (error: any) {
      if (error.code === 11000) {
        return sendError(res, PM.CONFLICT_TITLE_EXISTS, undefined, 409);
      }
      return sendError(res, PM.SERVER_ERROR, error.message);
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deletedPermission = await Permissions.findByIdAndDelete(req.params.id);
      if (!deletedPermission) return sendError(res, PM.NOT_FOUND);
      return sendSuccess(res, PM.DELETED_MESSAGE);
    } catch (error: any) {
      return sendError(res, PM.SERVER_ERROR, error.message);
    }
  }
}

export default Permission;
