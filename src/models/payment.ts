import { Schema, model, Types } from 'mongoose';
import { IPayment } from '../utils/type.ts';

const paymentSchema = new Schema<IPayment>(
  {
    userId: { type: String },
    subscriptionId: { type: Schema.Types.ObjectId, required: true, ref: 'Subscription' },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    transactionId: { type: String },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Payment = model<IPayment>('Payment', paymentSchema);

export default Payment;
