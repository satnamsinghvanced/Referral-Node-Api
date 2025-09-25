import cors from "cors";
import type { CorsOptions } from "cors";
import { main } from "../constant/main.ts";
import dotenv from "dotenv";
dotenv.config();

const { base_URL } = process.env;
const { CORS_NOT_ALLOWED } = main;

const normalizeOrigin = (url: string): string => url.replace(/\/$/, "");

const allowedOrigins: string[] = base_URL
  ? [normalizeOrigin(base_URL)]
  : [];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(normalizeOrigin(origin))) return callback(null, true);
    return callback(new Error(CORS_NOT_ALLOWED));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: "*",
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
