import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import userMessage from "../../constant/userMessage.js";

const secretKey = process.env.JWT_SECRET || "testsecretkey";

interface JwtPayload {
  userId: string;
  role: string;
}

export default {
  async signup(req: Request, res: Response) {
    try {
      const { 
        firstName,
        lastName,
        email,
        password,
        mobile,
        practiceName,
        role,
        medicalSpecialty,
      } = req.body;

      const existingUser = await User.findOne({ email });
     
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        mobile,
        practiceName,
        role,
        medicalSpecialty,
        status: "pending",
      });

      return res
        .status(200)
        .json({ message: userMessage.success.userRegistered, data: newUser });
    } catch (error) {
      console.error("Signup Error:", error);
      return res.status(500).json({ message: userMessage.serverError });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = (await User.findOne({ email })
        .select("+password")
        .lean()) as typeof User extends { prototype: infer U }
        ? U & { password?: string }
        : any;
      if (!user) {
        return res
          .status(404)
          .json({ message: userMessage.validation.userNotFound });
      }

      if (!user.password) {
        return res
          .status(400)
          .json({ message: userMessage.validation.invalidCredentials });
      }

      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: userMessage.validation.invalidCredentials });
      }

      const payload: JwtPayload = {
        userId: user._id.toString(),
        role: Array.isArray(user.role) ? user.role[0] : user.role,
      };

      const token = jwt.sign(payload, secretKey);

      delete user.password;

      return res.status(200).json({
        message: userMessage.success.loginSuccess,
        data: user,
        token,
      });
    } catch (error: any) {
      console.log("Login Error", error);
      return res.status(500).json({
        message: userMessage.serverError,
        error: error.message,
      });
    }
  },

  async getAllUser(req: Request, res: Response) {
    try {
      const users = await User.find().select("-password");
      return res.status(200).json({
        message: userMessage.success.allUsersFetched,
        data: users,
      });
    } catch (error: any) {
      console.error(" All Users Error:", error);
      return res
        .status(500)
        .json({ message: userMessage.serverError, error: error.message });
    }
  },
  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;

      if (!userId) {
        return res
          .status(400)
          .json({ message: userMessage.validation.userIdRequired });
      }

      const user = await User.findById(userId).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({ message: userMessage.validation.userNotFound });
      }

      return res
        .status(200)
        .json({ message: userMessage.success.userFetched, data: user });
    } catch (error: any) {
      console.error("Get User Error:", error);
      return res
        .status(500)
        .json({ message: userMessage.serverError, error: error.message });
    }
  },
  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const updateFields = req.body;

      if (updateFields.password) {
        updateFields.password = await bcrypt.hash(updateFields.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true,
      }).select("-password");

      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: userMessage.validation.userNotFound });
      }

      return res
        .status(200)
        .json({ message: userMessage.success.userUpdated, data: updatedUser });
    } catch (error: any) {
      console.error("Update User Error:", error);
      return res
        .status(500)
        .json({ message: userMessage.serverError, error: error.message });
    }
  },
  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res
          .status(404)
          .json({ message: userMessage.validation.userNotFound });
      }
      return res
        .status(200)
        .json({ message: userMessage.success.userDeleted, data: deletedUser });
    } catch (error: any) {
      console.error("Delete User Error:", error);
      return res
        .status(500)
        .json({ message: userMessage.serverError, error: error.message });
    }
  },
};
