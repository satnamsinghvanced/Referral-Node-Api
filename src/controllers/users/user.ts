import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/user.ts";
import { sendSuccess, sendError } from "../../helper/responseHelpers.ts";
import { USER_MESSAGE as UM } from "../../constant/userMessage.ts";
import { generateAccessToken, generateRefreshToken } from "../../middleware/auth/tokenService.ts";
import Subscription from "../../models/subscriptionSchema.ts";
import getFileUrl from "../../helper/fileUrlHelper.ts"
import PracticeType from "../../models/practiceType.ts";
import { validateEntityById } from "../../utils/validateEntityById.ts";

class UserController {
  static async signup(req: Request, res: Response): Promise<Response> {
    try {
      const subscription = await validateEntityById(Subscription, req.body.subscriptionId, res, UM.VALIDATION.INVALID_SUBSCRIPTION);
      if (!subscription) return res;

      const medicalSpecialty = await validateEntityById(PracticeType, req.body.medicalSpecialtyId, res, UM.VALIDATION.INVALID_MEDICAL_SPECIALITY);
      if (!medicalSpecialty) return res;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const image = getFileUrl(req.file);
      const user = new User({
        ...req.body,
        password: hashedPassword,
        status: "pending",
        subscriptionId: subscription._id,
        role: req.body.role || "admin",
        image,
        medicalSpecialty: medicalSpecialty._id
      });
      await user.save();
      return sendSuccess(res, UM.SUCCESS.USER_REGISTERED, user, 201);
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.email) {
        return sendError(res, UM.VALIDATION.USER_EXISTS, UM.VALIDATION.SOMETHING_WRONG_ERROR, 409);
      }
      return sendError(res, UM.SERVER_ERROR, error.message);
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, rememberMe } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) return sendError(res, UM.VALIDATION.INVALID_CREDENTIALS);
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) return sendError(res, UM.VALIDATION.INVALID_CREDENTIALS);
      const payload = { userId: user._id.toString(), role: user.role };
      const accessToken = generateAccessToken(payload, rememberMe);
      const refreshToken = generateRefreshToken(payload, rememberMe);
      user.refreshToken = refreshToken;
      await user.save();
      const { password: _, ...userData } = user.toObject();
      return sendSuccess(res, UM.SUCCESS.LOGIN_SUCCESS, { user: userData, accessToken });
    } catch (error: any) {
      return sendError(res, UM.SERVER_ERROR, error.message);
    }
  }

  static async getAllUser(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.find().select("-password");
      return sendSuccess(res, UM.SUCCESS.ALL_USERS_FETCHED, users || []);
    } catch (error: any) {
      return sendError(res, UM.SERVER_ERROR, error.message);
    }
  }

  static async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) {
        return sendError(res, UM.VALIDATION.USER_NOT_FOUND);
      }
      return sendSuccess(res, UM.SUCCESS.USER_FETCHED, user);
    } catch (error: any) {
      return sendError(res, UM.SERVER_ERROR, error.message);
    }
  }

  static async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const updateData = { ...req.body };
      if ('email' in updateData) {
        delete updateData.email;
      }
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
      if (req.file) {
        updateData.image = getFileUrl(req.file);
      }
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
        context: "query",
      }).select("-password");

      if (!updatedUser) {
        return sendError(res, UM.VALIDATION.USER_NOT_FOUND);
      }
      return sendSuccess(res, UM.SUCCESS.USER_UPDATED, updatedUser);
    } catch (error: any) {
      if (error.code === 11000) {
        return sendError(res, UM.VALIDATION.USER_EXISTS, undefined, 409);
      }
      return sendError(res, UM.SERVER_ERROR, error.message);
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return sendError(res, UM.VALIDATION.USER_NOT_FOUND);
      }
      return sendSuccess(res, UM.SUCCESS.USER_DELETED);
    } catch (error: any) {
      return sendError(res, UM.SERVER_ERROR, error.message);
    }
  }

  static async logout(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) return sendError(res, UM.VALIDATION.USER_NOT_FOUND);
      user.refreshToken = undefined;
      await user.save();
      return sendSuccess(res, UM.SUCCESS.LOGOUT_SUCCESS);
    } catch (error: any) {
      return sendError(res, UM.SERVER_ERROR, error.message);
    }
  }
}

export default UserController;
