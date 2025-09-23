import cors from "cors";
import type { CorsOptions } from "cors";
import dotenv from "dotenv";
import { main } from "../constant/main.ts";
dotenv.config();

const { base_URL, domain_URL } = process.env;
const { CORS_NOT_ALLOWED } = main
const allowedOrigins = [base_URL, domain_URL].filter(Boolean) as string[];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(CORS_NOT_ALLOWED));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
