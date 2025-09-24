import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    permissions: {
      type: Schema.Types.ObjectId,
      ref: "permission",
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

const Role = mongoose.model("role", roleSchema);

export default Role;
