import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    subscriptionId: { type: Schema.Types.ObjectId, ref: "Subscription" },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String },
    practiceName: { type: String },
    medicalSpecialty: { type: Schema.Types.ObjectId, ref: "practiceType", required: true },
    role: {
      type: String,
      required: true,
    },
    termsAccepted: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "active"] },
    accessToken: { type: String },
    refreshToken: { type: String },
    access: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    strict: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
