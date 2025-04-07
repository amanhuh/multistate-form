"use client"; 

import React from "react";
import { useState } from "react";

export default function One() {
  const handleChange = () => {

  }

  return (
    <div className="">
      <p className="text-2xl font-bold mb-5">Personal Information</p>
      <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col">
        <label htmlFor="fname" className="text-sm font-semibold mb-2">First Name</label>
        <input name="fname" className="border-2 border-gray-300 focus-visible:border-blue-700! rounded-lg px-3 py-1.5"  onChange={handleChange}></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="lname" className="text-sm font-semibold mb-2">Last Name</label>
        <input name="lname" className="border-2 border-gray-300 focus-visible:border-blue-700! rounded-lg px-3 py-1.5" onChange={handleChange}></input>
      </div>
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="email" className="text-sm font-semibold mb-2">Email</label>
        <input name="email" className="border-2 border-gray-300 focus-visible:border-blue-700! rounded-lg px-3 py-1.5" onChange={handleChange}></input>
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="phone" className="text-sm font-semibold mb-2">Phone</label>
        <input name="phone" className="border-2 border-gray-300 focus-visible:border-blue-700! rounded-lg px-3 py-1.5" onChange={handleChange}></input>
      </div>
    </div>
  );
}