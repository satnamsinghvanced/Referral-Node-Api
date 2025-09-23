import { Response } from "express";

export type ResponseStatus = "success" | "error";

interface ResponsePayload<T = any> {
  status: "success" | "error";
  message: string;
  data?: T;
  error?: any;
}

export function createResponse<T = any>(payload: ResponsePayload<T>) {
  const { status, message, data, error } = payload;

  if (status === "success") {
    return {
      status,
      message,
      success: true,
      ...(data !== undefined && { data }),
    };
  } else {
    return {
      status,
      message,
      success: false,
      ...(error !== undefined && { error }),
    };
  }
}

export function sendSuccess(res: Response, message: string, data?: any, statusCode = 200) {
  return res.status(statusCode).json(createResponse({
    status: "success",
    message,
    data,
  }));
}

export function sendError(res: Response, message: string, error?: any, statusCode = 500) {
  return res.status(statusCode).json(createResponse({
    status: "error",
    message,
    error,
  }));
}
