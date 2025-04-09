import mongoose, { Schema, model, models } from "mongoose";

const SubmissionSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  clgName: { type: String },
  course: { type: String },
  class: { type: String },
  div: { type: String },
  rollNo: { type: String },
  image: { type: String },
  step: { type: Number },
  isSubmitted: { type: Boolean },
}, { timestamps: true });

const Submission = models.Submission || model("Submission", SubmissionSchema);

export default Submission;
