import mongoose from "mongoose";
const patientSchema = new mongoose.Schema(
  {
    uniqueId: { type: String, unique: true, required: true },
    fullName: { type: String },
    email: { type: String, unique: true, required: true },
    age: { type: Number },
    role: { type: String, enum: ["patient", "doctor"], required: true },
    phoneNumber: { type: String },
    referringByName: { type: String, required: true },
    referringPracticeName: { type: String },
    referringSpecialty: { type: String },
    relationshipName: { type: String },
    referringPhoneNumber: { type: String },
    referringEmail: { type: String },
    referringWebsite: { type: String },
    referringFax: { type: String },
    practiceAddress: { type: String },
    practiceAddressCity: { type: String },
    practiceAddressState: { type: String },
    practiceAddressZip: { type: String },
    treatmentType: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "scheduled", "completed"],
      default: "new",
    },
    urgency: { type: String, enum: ["low", "medium", "high"] },
    insuranceProvider: { type: String },
    preferredTime: {
      type: String,
      enum: [
        "morning",
        "afternoon",
        "evening",
        "afterSchool",
        "lunchBreak",
        "weekend",
      ],
    },
    reasonForReferral: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
