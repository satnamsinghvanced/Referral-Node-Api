import { Request, Response } from "express";
import Role from "../../models/role.ts";
import { ROLE_MESSAGES } from "../../constant/role.ts";
import { sendError, sendSuccess } from "../../helper/responseHelpers.ts";
import {
  deleteById,
  validateEntityById,
} from "../../utils/validateEntityById.ts";

export default {
  async addRole(req: Request, res: Response): Promise<Response> {
    try {
      const role = new Role(req.body);
      await role.save();
      return sendSuccess(res, ROLE_MESSAGES.CREATED_MESSAGE, role, 201);
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.role) {
        return sendError(
          res,
          ROLE_MESSAGES.VALIDATION_ERROR,
          ROLE_MESSAGES.CONFLICT_ROLE_EXISTS,
          409
        );
      }
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async updateRole(req: Request, res: Response): Promise<Response> {
    try {
      const updatedRole = await Role.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedRole) {
        return sendError(
          res,
          ROLE_MESSAGES.VALIDATION_ERROR,
          ROLE_MESSAGES.NOT_FOUND,
          409
        );
      }
      return sendSuccess(res, ROLE_MESSAGES.UPDATED_MESSAGE, updatedRole);
    } catch (error: any) {
      if (error.code === 11000) {
        return sendError(
          res,
          ROLE_MESSAGES.CONFLICT_ROLE_EXISTS,
          undefined,
          409
        );
      }
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async deleteRole(req: Request, res: Response): Promise<Response> {
    return deleteById(
      Role,
      req.params.id,
      res,
      ROLE_MESSAGES.NOT_FOUND,
      ROLE_MESSAGES.DELETED_MESSAGE
    );
  },

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const roles = await Role.find();
      return sendSuccess(res, ROLE_MESSAGES.FETCH_ALL_SUCCESS, roles);
    } catch (error: any) {
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const role = (await validateEntityById(
        Role,
        req.params.id,
        res,
        ROLE_MESSAGES.NOT_FOUND
      )) as any | null;
      if (!role) return res;
      return sendSuccess(res, ROLE_MESSAGES.FETCH_ONE_SUCCESS, role);
    } catch (error: any) {
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },
};
