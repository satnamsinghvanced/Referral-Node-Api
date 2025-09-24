import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { sendError } from "../helper/responseHelpers.ts";
import { validatorConstant } from "../constant/validator.ts";

export function validateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return sendError(res, validatorConstant.VALIDATION_FAILD_MESSAGE, error.details.map(d => d.message).join(", "), 400);
    }
    req.body = value;
    next();
  };
}

export function validateParams(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      return sendError(res, validatorConstant.VALIDATION_FAILD_MESSAGE, error.details.map(d => d.message).join(", "), 400);
    }
    req.params = value;
    next();
  };
}
