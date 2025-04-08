import { profile } from 'console';
import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
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