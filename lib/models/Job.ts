import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  type: "full-time" | "part-time" | "contract" | "internship";
  remote: boolean;
  tags: string[];
  applicationUrl?: string;
  applicationEmail?: string;
  postedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  featured: boolean;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salary: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "USD" },
    },
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
    },
    remote: { type: Boolean, default: false },
    tags: [{ type: String }],
    applicationUrl: { type: String },
    applicationEmail: { type: String },
    postedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
JobSchema.index({ title: "text", company: "text", description: "text" });
JobSchema.index({ tags: 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ type: 1 });
JobSchema.index({ postedAt: -1 });
JobSchema.index({ isActive: 1 });

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
