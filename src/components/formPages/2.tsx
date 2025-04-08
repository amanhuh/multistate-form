"use client";

import React from "react";
import { FormData } from "@/app/page";

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: Partial<Record<keyof FormData, string>>;
}

export default function Two({ formData, setFormData, formErrors }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full">
      <p className="text-2xl font-bold mb-5">Education Details</p>

      <div className="flex flex-col">
        <label htmlFor="clgName" className="text-sm font-semibold mb-2">
          College Name
        </label>
        <input
          name="clgName"
          className={`border-2 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700 focus-visible:outline-blue-700 rounded-lg px-3 py-1.5 ${
            formErrors.clgName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your college name"
          value={formData.clgName}
          onChange={handleChange}
        />
        {formErrors.clgName && (
          <p className="text-red-500 text-sm mt-1">{formErrors.clgName}</p>
        )}
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="course" className="text-sm font-semibold mb-2">
          Course
        </label>
        <input
          name="course"
          className={`border-2 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700 focus-visible:outline-blue-700 rounded-lg px-3 py-1.5 ${
            formErrors.course ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your course name"
          value={formData.course}
          onChange={handleChange}
        />
        {formErrors.course && (
          <p className="text-red-500 text-sm mt-1">{formErrors.course}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex flex-col w-full">
          <label htmlFor="class" className="text-sm font-semibold mb-2">
            Class
          </label>
          <input
            name="class"
            className={`border-2 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700 focus-visible:outline-blue-700 rounded-lg px-3 py-1.5 ${
              formErrors.class ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="eg: SYIT"
            value={formData.class}
            onChange={handleChange}
          />
          {formErrors.class && (
            <p className="text-red-500 text-sm mt-1">{formErrors.class}</p>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="div" className="text-sm font-semibold mb-2">
            Div
          </label>
          <input
            name="div"
            className={`border-2 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700 focus-visible:outline-blue-700 rounded-lg px-3 py-1.5 ${
              formErrors.div ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="eg: A"
            value={formData.div}
            onChange={handleChange}
          />
          {formErrors.div && (
            <p className="text-red-500 text-sm mt-1">{formErrors.div}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="rollNo" className="text-sm font-semibold mb-2">
          Roll No
        </label>
        <input
          name="rollNo"
          className={`border-2 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700 focus-visible:outline-blue-700 rounded-lg px-3 py-1.5 ${
            formErrors.rollNo ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your roll number"
          value={formData.rollNo}
          onChange={handleChange}
        />
        {formErrors.rollNo && (
          <p className="text-red-500 text-sm mt-1">{formErrors.rollNo}</p>
        )}
      </div>
    </div>
  );
}
