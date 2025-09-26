import { Response } from "express";
import { sendError, sendSuccess } from "../helper/responseHelpers.ts";
import { Document, Model } from "mongoose";

export async function validateEntityById<T extends Document>(
  model: { findById(id: string): Promise<T | null> },
  id: string,
  res: Response,
  errorMessage: string
): Promise<any | null> {
  if (!id || typeof id !== "string") {
    sendError(res, errorMessage);
    return null;
  }

  const entity = await model.findById(id);
  if (!entity) {
    sendError(res, errorMessage);
    return null;
  }

  return entity;
}


export async function deleteById<T extends Document>(
  model: Model<any>,
  id: string,
  res: Response,
  notFoundMessage: string,
  deletedMessage: string
): Promise<Response> {
  try {
    const deletedDoc = await model.findByIdAndDelete(id);
    if (!deletedDoc) {
      return sendError(res, notFoundMessage, undefined, 404);
    }
    return sendSuccess(res, deletedMessage);
  } catch (error: any) {
    return sendError(res, "Internal server error", error.message);
  }
} 