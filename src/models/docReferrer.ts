import mongoose, { Schema } from "mongoose";

const docReferrerSchema = new Schema(
  {
    referredBy: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
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
    status:{
      type: String,
        enum:["New", "Schedule", "Completed"],
        default:"New"
    }
  },
  { timestamps: true, strict: true }
);

const docReferrer = mongoose.model("docReferrer", docReferrerSchema);

export default docReferrer;
