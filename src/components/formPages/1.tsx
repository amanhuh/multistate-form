"use client";

import React from "react";
import { FormData } from "@/app/page";

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: Partial<FormData>;
}

export default function One({ formData, setFormData, formErrors }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-5">Personal Details</p>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-sm font-semibold mb-2">
            First Name
          </label>
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="border-2 border-gray-300 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700 rounded-lg px-3 py-1.5"
            placeholder="First Name"
          />
          {formErrors.firstname && (
            <p className="text-red-500 text-sm mt-1">{formErrors.firstname}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastname" className="text-sm font-semibold mb-2">
            Last Name
          </label>
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="border-2 border-gray-300 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700 rounded-lg px-3 py-1.5"
            placeholder="Last Name"
          />
          {formErrors.lastname && (
            <p className="text-red-500 text-sm mt-1">{formErrors.lastname}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="email" className="text-sm font-semibold mb-2">
          Email
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border-2 border-gray-300 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700 rounded-lg px-3 py-1.5"
          placeholder="Eg: email@gmail.com"
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
        )}
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="phone" className="text-sm font-semibold mb-2">
          Phone
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border-2 border-gray-300 bg-gray-100 focus-visible:bg-white focus-visible:border-blue-700 rounded-lg px-3 py-1.5"
          placeholder="+91"
        />
        {formErrors.phone && (
          <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
        )}
      </div>
    </div>
  );
}
