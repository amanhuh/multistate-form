import React from "react";
import { useState } from "react";

export default function One() {
  const handleChange = () => {

  }

  return (
    <div className="">
      <p className="text-2xl font-bold mb-5">Personal Information</p>
      <div>
        <label htmlFor="fname" className="text-sm font-semibold mb-2">First Name</label>
        <input name="fname" className="px-3 py-1.5" placeholder="First Name" onChange={handleChange}></input>
      </div>
    </div>
  );
}