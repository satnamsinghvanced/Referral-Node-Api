import mongoose, { Schema } from "mongoose";

const permissionsSchema = new Schema(
  {
    manageReferrals: { type: Boolean, default: false },
    manageTeam: { type: Boolean, default: false },
    manageSettings: { type: Boolean, default: false },
    manageIntegrations: { type: Boolean, default: false },
    viewAnalytics: { type: Boolean, default: false },
    manageBilling: { type: Boolean, default: false },
    manageReviews: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const permissions = mongoose.model("permission", permissionsSchema);

export default permissions;
