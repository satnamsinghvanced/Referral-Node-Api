import mongoose, { Schema } from "mongoose";

const doctorReferrerSchema = new Schema(
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
      enum: ["doctor"],
      default: "doctor",
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
      ref: "practiceType",
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    qrCode: {
      type: String,
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

const DoctorReferrer = mongoose.model("doctorReferrer", doctorReferrerSchema);
export default DoctorReferrer;
