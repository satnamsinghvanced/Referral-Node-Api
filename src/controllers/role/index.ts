import { Request, Response } from "express";
import Role from "../../models/role.ts";
import Permissions from "../../models/permissions.ts";
import { VALIDATION_MESSAGES, ROLE_MESSAGES } from "../../constant/role.ts";
import { sendError, sendSuccess } from "../../utils/responseHelpers.ts";

export default {
  async addRole(req: Request, res: Response) {
    try {
      const { role, description, permissions } = req.body;

      // if (!role || !description || !permissions) {
      //   return res.status(400).json({
      //     message:
      //       VALIDATION_MESSAGES.ROLE.ROLE_NAME["any.required"] +
      //       ", " +
      //       VALIDATION_MESSAGES.ROLE.DESCRIPTION["any.required"] +
      //       ", and " +
      //       VALIDATION_MESSAGES.ROLE.PERMISSIONS["any.required"],
      //   });
      // }

      // const roleExists = await Role.findOne({ role });
      // if (roleExists) {
      //   return res
      //     .status(409)
      //     .json({ message: ROLE_MESSAGES.CONFLICT_ROLE_EXISTS });
      // }

      const defaultPermissions = {
        manageReferrals: false,
        manageTeam: false,
        manageSettings: false,
        manageIntegrations: false,
        viewAnalytics: false,
        manageBilling: false,
        manageReviews: false,
      };
      const fullPermissions = { ...defaultPermissions, ...permissions };

      const newPermission = new Permissions(fullPermissions);
      await newPermission.save();

      const newRole = new Role({
        role,
        description,
        permissions: newPermission._id,
      });
      await newRole.save();

      const populatedRole = await Role.findById(newRole._id).populate(
        "permissions"
      );
      return sendSuccess(
        res, ROLE_MESSAGES.CREATED_SUCCESS,
        {role: populatedRole,}
      );
    } catch (error) {
      console.error("Error assigning role:", error);
      return res.status(500).json({ message: ROLE_MESSAGES.SERVER_ERROR });
    }
  },
  async updateRole(req: Request, res: Response) {
    try {
      // const { id } = req.params;
      // if (!id) {
      //   return res
      //     .status(400)
      //     .json({ message: VALIDATION_MESSAGES.ROLE.ID_PARAM["any.required"] });
      // }

      const existingRole = await Role.findById(req.params.id);
      const { role, description, permissions } = req.body;
      if (!existingRole) {
        return res.status(404).json({ message: ROLE_MESSAGES.NOT_FOUND });
      }

      // if (permissions) {
        const existingPermissions = await Permissions.findById(
          existingRole.permissions
        );
        if (!existingPermissions) {
          return res
            .status(404)
            .json({ message: ROLE_MESSAGES.EXIST_PERMISSION_MESSAGE });
        }

        Object.assign(existingPermissions, permissions);
        await existingPermissions.save();
      // }

      existingRole.role = role || existingRole.role;
      existingRole.description = description || existingRole.description;
      await existingRole.save();

      const updatedRole = await Role.findById(req.params.id).populate("permissions");

      return res.status(200).json({
        message: ROLE_MESSAGES.UPDATED_SUCCESS,
        role: updatedRole,
      });
    } catch (error: any) {
      // console.error("Error updating role:", error);
      return sendError( res, ROLE_MESSAGES.SERVER_ERROR, error.message );
    }
  },
  async deleteRole(req: Request, res: Response) {
    try {
      // const { id } = req.params;

      // if (!id) {
      //   return res
      //     .status(400)
      //     .json({ message: VALIDATION_MESSAGES.ROLE.ID_PARAM["any.required"] });
      // }

      const deletedRole = await Role.findByIdAndDelete(req.params.id);

      // if (!deletedRole) {
      //   return res.status(404).json({ message: ROLE_MESSAGES.NOT_FOUND });
      // }
      return sendSuccess(res, ROLE_MESSAGES.DELETED_SUCCESS, deletedRole);
      // return res.status(200).json({
      //   message: ROLE_MESSAGES.DELETED_SUCCESS,
      //   deletedRole,
      // });
    } catch (error: any) {
      // console.error("Error deleting role:", error);
      // return res.status(500).json({ message: ROLE_MESSAGES.SERVER_ERROR });
      return sendError(res, ROLE_MESSAGES.SERVER_ERROR, error.message);
    }
  },

  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await Role.find();
      const allRoles = await Role.countDocuments();

      return res.status(200).json({
        message: ROLE_MESSAGES.FETCH_ALL_SUCCESS,
        allRoles,
        roles,
      });
    } catch (error) {
      console.error("Error getting role:", error);
      return res.status(500).json({ message: ROLE_MESSAGES.SERVER_ERROR });
    }
  },

  async getRoleWithPermissions(req: Request, res: Response) {
    try {
      const { role } = req.params;
      if (!role) {
        return res.status(400).json({
          message: VALIDATION_MESSAGES.ROLE.ROLE_PARAM["any.required"],
        });
      }

      const foundRole = await Role.findOne({ role }).populate("permissions");

      if (!foundRole) {
        return res.status(404).json({ message: ROLE_MESSAGES.NOT_FOUND });
      }

      return res.status(200).json({ role: foundRole });
    } catch (error) {
      console.error("Error fetching roles:", error);
      return res.status(500).json({ message: ROLE_MESSAGES.SERVER_ERROR });
    }
  },
};
