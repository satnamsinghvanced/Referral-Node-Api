import mongoose, { Schema } from "mongoose";

const referrerSchema = new Schema(
  {
    referredBy: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["doctor", "patient"],
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    practiceName: {
      type: String,
      trim: true,
    },
    practiceAddress: {
      type: String,
      trim: true,
    },
    practiceType: {
      type: Schema.Types.ObjectId,
    },

    notes: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, strict: true }
);

const Referrer = mongoose.model("referrer", referrerSchema);

export default Referrer;
