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
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  div: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  }
});

export const Submissions = models.FormSubmission || model("FormSubmission", formDataSchema);