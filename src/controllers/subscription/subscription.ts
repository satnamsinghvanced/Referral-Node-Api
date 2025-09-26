import { Request, Response } from "express";
import Subscription from "../../models/subscriptionSchema.ts";
import { SUBSCRIPTION_MESSAGES } from "../../constant/subscription.ts";
import { ISubscription } from "../../utils/type.ts";
import { sendSuccess, sendError } from "../../helper/responseHelpers.ts";

class SubscriptionController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const subscriptions: ISubscription[] = await Subscription.find();
      return sendSuccess(res, SUBSCRIPTION_MESSAGES.FETCH_MESSAGE, subscriptions);
    } catch (error: any) {
      return sendError(res, SUBSCRIPTION_MESSAGES.SERVER_ERROR, error.message);
    }
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const subscription = await Subscription.findById(req.params.id);
      if (!subscription) return sendError(res,SUBSCRIPTION_MESSAGES.VALIDATION_MESSAGES, SUBSCRIPTION_MESSAGES.NOT_FOUND, 404);
      return sendSuccess(res, SUBSCRIPTION_MESSAGES.FETCH_MESSAGE, subscription);
    } catch (error: any) {
      return sendError(res, SUBSCRIPTION_MESSAGES.SERVER_ERROR, error.message);
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const subscription = new Subscription(req.body);
      await subscription.save();
      return sendSuccess(res, SUBSCRIPTION_MESSAGES.CREATED_MESSAGE, subscription, 201);
    } catch (error: any) {
      if (error.code === 11000) {
        return sendError(res, SUBSCRIPTION_MESSAGES.CONFLICT_TITLE_EXISTS, undefined, 409);
      }
      return sendError(res, SUBSCRIPTION_MESSAGES.SERVER_ERROR, error.message);
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!subscription) return sendError(res, SUBSCRIPTION_MESSAGES.VALIDATION_MESSAGES, SUBSCRIPTION_MESSAGES.NOT_FOUND, 404);
      return sendSuccess(res, SUBSCRIPTION_MESSAGES.UPDATE_MESSAGE, subscription);
    } catch (error: any) {
      if (error.code === 11000) {
        return sendError(res, SUBSCRIPTION_MESSAGES.CONFLICT_TITLE_EXISTS, undefined, 409);
      }
      return sendError(res, SUBSCRIPTION_MESSAGES.SERVER_ERROR, error.message);
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const subscription = await Subscription.findByIdAndDelete(req.params.id);
      if (!subscription) return sendError(res,SUBSCRIPTION_MESSAGES.VALIDATION_MESSAGES, SUBSCRIPTION_MESSAGES.NOT_FOUND, 404);
      return sendSuccess(res, SUBSCRIPTION_MESSAGES.DELETED_SUCCESS);
    } catch (error: any) {
      return sendError(res, SUBSCRIPTION_MESSAGES.SERVER_ERROR, error.message);
    }
  }
}

export default SubscriptionController;
