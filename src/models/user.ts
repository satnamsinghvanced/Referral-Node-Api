import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  subscriptionId: { type: Schema.Types.ObjectId },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: String, required: true },
  email: { type: String, unique: true, required: true },
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
  role: [
    {
      type: String,
      enum: ["admin", "manager", "doctor", "staff", "assistant"],
      required: true,
    },
  ],
  status: { type: String, enum: ["pending", "active"] },
});
const users = mongoose.model("user", userSchema);
export default users;
