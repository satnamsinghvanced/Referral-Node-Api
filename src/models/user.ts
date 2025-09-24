import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    subscriptionId: { type: Schema.Types.ObjectId },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String },
    practiceName: { type: String },
    medicalSpecialty: [
      {
        type: String,
        enum: [
          "orthodontics",
          "generalDentistry",
          "OralSurgery",
          "endodontics",
          "periodontics",
          "other",
        ],
        required: true,
      },
    ],
    role: {
      type: String,
      required: true,
    },
    status: { type: String, enum: ["pending", "active"] },
  },
  {
    timestamps: true,
    strict: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
