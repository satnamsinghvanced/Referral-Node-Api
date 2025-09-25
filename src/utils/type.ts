import { Types } from 'mongoose';

export  interface IPrice {
  daily?: number;
  monthly?: number;
  yearly?: number;
  custom?: string;
}

export interface ISubscription {
  title: string;
  description?: string;
  price: IPrice;
  pointTitle?: string;
  points?: string[];
  createdAt: Date;
}

export type ResponseStatus = "success" | "error";

export interface IPayment extends Document {
  userId: string;
  subscriptionId: Types.ObjectId;
  email : string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocReferrerType {
  email?: string;
}
