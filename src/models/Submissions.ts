import mongoose, { Schema, models, model } from 'mongoose';

const formDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  clgName: {
    type: String
  },
  course: {
    type: String
  },
  class: {
    type: String
  },
  div: {
    type: String
  },
  rollNo: {
    type: String
  },
  profileImage: {
    type: String
  },
  isSubmitted: {
    type: Boolean,
    default: false
  }
});

export const Submissions = models.FormSubmission || model("FormSubmission", formDataSchema);