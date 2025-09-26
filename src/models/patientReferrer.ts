import mongoose, { Schema } from "mongoose";

const patientReferrerSchema = new Schema(
  {
    referredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["patient"],
      default: "patient",
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
    notes: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["New", "Schedule", "Completed"],
      default: "New",
    },
    addedVia: {
      type: String,
      enum: ["QR", "NFC", "Manual"],
      default: "Manual",
    },
    referrals: [
      {
        type: Schema.Types.ObjectId,
        // ref: "Referral",
      },
    ],
    referralStats: {
      total: {
        type: Number,
        default: 0,
      },
      thisMonth: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true, strict: true }
);

const PatientReferrer = mongoose.model("PatientReferrer", patientReferrerSchema);
export default PatientReferrer;
