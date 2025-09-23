import { Request, Response } from "express";
import Payment from "../../models/payment.ts";
import { sendSuccess, sendError } from "../../utils/responseHelpers.ts";
import { CONTROLLER_MESSAGES as CM } from "../../constant/payment.ts";
import stripe from "../../config/stripe.ts";
class PaymentController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const payments = await Payment.find();
      return sendSuccess(res, CM.PAYMENT_FETCH_SUCCESS, payments);
    } catch (error: any) {
      return sendError(res, CM.PAYMENT_FETCH_ERROR, error.message);
    }
  }

  static async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) return sendError(res, CM.PAYMENT_NOT_FOUND, null, 404);
      return sendSuccess(res, CM.PAYMENT_FETCH_SUCCESS, payment);
    } catch (error: any) {
      return sendError(res, CM.PAYMENT_FETCH_ERROR, error.message);
    }
  }

  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { amount, currency, email, paymentMethod, subscriptionId, userId } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        payment_method: paymentMethod,
        receipt_email: email,
        confirm: true,
        metadata: {
          subscriptionId,
          userId,
        },
      });
      if (paymentIntent.status === "succeeded") {
        const payment = await Payment.create({
          userId,
          subscriptionId,
          email,
          amount,
          currency,
          paymentMethod,
          status: "succeeded",
          transactionId: paymentIntent.id,
        });
        return sendSuccess(res, CM.PAYMENT_CREATE_SUCCESS, payment, 201);

      } else if (paymentIntent.status === "requires_action" || paymentIntent.status === "requires_confirmation") {
        const payment = {
          clientSecret: paymentIntent.client_secret,
          paymentIntentStatus: paymentIntent.status,
        }
        return sendSuccess(res, CM.PAYMENT_CREATE_SUCCESS, payment);
      } else {
        return sendError(res, CM.PAYMENT_CREATE_ERROR, paymentIntent.status, 400);
      }
    } catch (error: any) {
      console.error(error);
      return sendError(res, CM.PAYMENT_CREATE_ERROR, error.message, 400);
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const payment = await Payment.findByIdAndDelete(req.params.id);
      if (!payment) return sendError(res, CM.PAYMENT_NOT_FOUND, null, 404);
      return sendSuccess(res, CM.PAYMENT_DELETE_SUCCESS, payment);
    } catch (error: any) {
      return sendError(res, CM.PAYMENT_DELETE_ERROR, error.message);
    }
  }
}

export default PaymentController;
