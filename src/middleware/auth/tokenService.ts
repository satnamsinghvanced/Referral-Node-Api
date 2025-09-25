import jwt from "jsonwebtoken";
import { AUTH } from "../../constant/auth.ts";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_EXPIRY_SHORT = "1h";
const ACCESS_TOKEN_EXPIRY_LONG = "1d";

const REFRESH_TOKEN_EXPIRY_SHORT = "1d";
const REFRESH_TOKEN_EXPIRY_LONG = "7d";

const secretKey = process.env.JWT_SECRET || "secret";
const refreshSecretKey = process.env.JWT_REFRESH_SECRET || "refreshSecret";
if (!secretKey || !refreshSecretKey) {
  throw new Error(AUTH.SECRECT_REFERSH_KEY);
}

export const generateAccessToken = (payload: object, rememberMe = false): string => {
  const expiresIn = rememberMe ? ACCESS_TOKEN_EXPIRY_LONG : ACCESS_TOKEN_EXPIRY_SHORT;
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const generateRefreshToken = (payload: object, rememberMe = false): string => {
  const expiresIn = rememberMe ? REFRESH_TOKEN_EXPIRY_LONG : REFRESH_TOKEN_EXPIRY_SHORT;
  return jwt.sign(payload, refreshSecretKey, { expiresIn });
};



