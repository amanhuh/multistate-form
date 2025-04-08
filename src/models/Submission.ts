import mongoose, { Schema, model, models } from "mongoose";

const SubmissionSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  clgName: { type: String, required: true },
  course: { type: String, required: true },
  class: { type: String, required: true },
  div: { type: String, required: true },
  rollNo: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Submission = models.Submission || model("Submission", SubmissionSchema);

export default Submission;
