import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
