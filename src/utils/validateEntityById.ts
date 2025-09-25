import { Response } from "express";
import { sendError } from "../helper/responseHelpers.ts";
import { Document } from "mongoose";

export async function validateEntityById<T extends Document>(
  model: { findById(id: string): Promise<T | null> },
  id: string,
  res: Response,
  errorMessage: string
): Promise<T | null> {
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
