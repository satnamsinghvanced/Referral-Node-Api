import mongoose, { Schema } from "mongoose";
import { ref } from "process";

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

    status:{
        type: String,
        enum:["New", "Schedule", "Completed"],
        default:"New"
    }
  },
  { timestamps: true, strict: true }
);

const patientReferrer = mongoose.model("patientReferrer", patientReferrerSchema)

export default patientReferrer;
