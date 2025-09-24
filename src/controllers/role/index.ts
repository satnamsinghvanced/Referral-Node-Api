import { Request, Response } from "express";
import Role from "../../models/role.ts";
import { ROLE_MESSAGES } from "../../constant/role.ts";
import { sendError, sendSuccess } from "../../helper/responseHelpers.ts";

export default {
  async addRole(req: Request, res: Response): Promise<Response> {
    try {
      const role = new Role(req.body);
      await role.save();
      return sendSuccess(res, ROLE_MESSAGES.CREATED_MESSAGE, role, 201);
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.role) {
        return sendError(res, ROLE_MESSAGES.CONFLICT_ROLE_EXISTS, undefined, 409);
      }
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },
  async updateRole(req: Request, res: Response): Promise<Response> {
    try {
      const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedRole) {
        return sendError(res, ROLE_MESSAGES.NOT_FOUND);
      }
      return sendSuccess(res, ROLE_MESSAGES.UPDATED_MESSAGE, updatedRole);
    } catch (error: any) {
      if (error.code === 11000) {
        return sendError(res, ROLE_MESSAGES.CONFLICT_ROLE_EXISTS, undefined, 409);
      }
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },


  async deleteRole(req: Request, res: Response): Promise<Response> {
    try {
      const deletedRole = await Role.findByIdAndDelete(req.params.id);
      if (!deletedRole) {
        return sendError(res, ROLE_MESSAGES.NOT_FOUND);
      }
      return sendSuccess(res, ROLE_MESSAGES.DELETED_MESSAGE);
    } catch (error: any) {
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },


  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const roles = await Role.find().populate("permissions");
      return sendSuccess(res, ROLE_MESSAGES.FETCH_ALL_SUCCESS, roles);
    } catch (error: any) {
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },


  async get(req: Request, res: Response): Promise<Response> {
    try {
      const role = await Role.findById(req.params.id).populate("permissions");
      if (!role) {
        return sendError(res, ROLE_MESSAGES.NOT_FOUND);
      }
      return sendSuccess(res, ROLE_MESSAGES.FETCH_ONE_SUCCESS, role);
    } catch (error: any) {
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },
};
