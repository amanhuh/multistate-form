"use client";

import { FormData } from "@/app/page";

interface Props {
  formData: FormData;
}

export default function Review({ formData }: Props) {
  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Information</h2>

      {/* Profile Image */}
      {formData.image && (
        <div className="flex justify-center mb-6">
          <img
            src={typeof formData.image === "string" ? formData.image : URL.createObjectURL(formData.image)}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 shadow-md"
          />
        </div>
      )}

      {/* Personal Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <div><strong>First Name:</strong> {formData.firstname}</div>
          <div><strong>Last Name:</strong> {formData.lastname}</div>
          <div><strong>Email:</strong> {formData.email}</div>
          <div><strong>Phone:</strong> {formData.phone}</div>
        </div>
      </div>

      {/* Education Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Education Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <div><strong>College:</strong> {formData.clgName}</div>
          <div><strong>Course:</strong> {formData.course}</div>
          <div><strong>Class:</strong> {formData.class}</div>
          <div><strong>Division:</strong> {formData.div}</div>
          <div><strong>Roll No:</strong> {formData.rollNo}</div>
        </div>
      </div>

      {/* Add more sections here if needed */}
    </div>
  );
}
