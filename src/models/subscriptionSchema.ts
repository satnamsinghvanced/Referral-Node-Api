import mongoose, { Schema, Model } from "mongoose";
import { IPrice, ISubscription } from "../utils/type.ts";

const priceSchema = new Schema<IPrice>(
  {
    daily: {
      type: Number,
      min: 0,
    },
    monthly: {
      type: Number,
      min: 0,
    },
    yearly: {
      type: Number,
      min: 0,
    },
    custom: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const subscriptionSchema = new Schema<ISubscription>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: priceSchema,
      required: true,
      validate: {
        validator: (price: IPrice) =>
          price.daily !== undefined ||
          price.monthly !== undefined ||
          price.yearly !== undefined ||
          (price.custom !== undefined && price.custom.trim() !== ""),
      },
    },
    pointTitle: {
      type: String,
      trim: true,
    },
    points: [
      {
        type: String,
        trim: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Subscription: Model<ISubscription> = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
