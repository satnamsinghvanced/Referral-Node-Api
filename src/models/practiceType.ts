import mongoose, { Schema } from "mongoose";

const practice = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
},
  {
    timestamps: true,
    versionKey: false,
  },
)

const PracticeType = mongoose.model("practiceType", practice);

export default PracticeType;