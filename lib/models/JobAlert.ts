import mongoose, { Schema, Document } from "mongoose";

export interface IJobAlert extends Document {
  email: string;
  keywords: string[];
  location?: string;
  jobType?: "full-time" | "part-time" | "contract" | "internship";
  remote?: boolean;
  salaryMin?: number;
  isActive: boolean;
  frequency: "daily" | "weekly" | "instant";
  lastSent?: Date;
}

const JobAlertSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    keywords: [{ type: String }],
    location: { type: String },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
    },
    remote: { type: Boolean },
    salaryMin: { type: Number },
    isActive: { type: Boolean, default: true },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "instant"],
      default: "weekly",
    },
    lastSent: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Create indexes
JobAlertSchema.index({ email: 1 });
JobAlertSchema.index({ isActive: 1 });
JobAlertSchema.index({ frequency: 1 });

export default mongoose.models.JobAlert ||
  mongoose.model<IJobAlert>("JobAlert", JobAlertSchema);
