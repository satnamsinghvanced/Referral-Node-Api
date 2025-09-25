import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../../models/user.ts";
import { sendError, sendSuccess } from "../../helper/responseHelpers.ts";
import { generateAccessToken, generateRefreshToken } from "../../middleware/auth/tokenService.ts";
import { AUTH } from "../../constant/auth.ts";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

const refreshSecretKey = process.env.JWT_REFRESH_SECRET || "refreshSecret";
const secretKey = process.env.JWT_SECRET || "secret";

if (!refreshSecretKey || !secretKey) {
  throw new Error(AUTH.JWT_MESSING_ERROR);
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(res, AUTH.UNAUTHORIZED, null, 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded as any;
    next();
  } catch (error: any) {
    console.error('verifyToken error:', error);
    if (error.name === "TokenExpiredError") {
      return sendError(res, AUTH.ACCESS_EXPIRED, null, 401);
    }
    return sendError(res, AUTH.INVALID_TOKEN, null, 403);
  }
};

export const auth = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return sendError(res, AUTH.REFESH_REQUIRED, null, 400);
    }
    const decoded = jwt.verify(refreshToken, refreshSecretKey) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return sendError(res, AUTH.INVALID_ERROR, null, 401);
    }
    const payload = { userId: user._id.toString(), role: user.role };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    user.refreshToken = newRefreshToken;
    await user.save();
    return sendSuccess(res, AUTH.TOKEN_SUCCESS, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error: any) {
    return sendError(res, AUTH.FAILD_TOKEN, error.message, 500);
  }
};
