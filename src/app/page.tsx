"use client";

import Image from "next/image";
import React from "react";
import Accordion from "@/components/accordion";
import * as Steps from "@/components/formPages";
import Buttons from "@/components/Buttons";

const stepArray = Object.values(Steps);
const stepLength = stepArray.length;
export interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;

  clgName: string;
  course: string;
  class: string;
  div: string;
  rollNo: string;
  
  image?: File;
}

export default function Home() {
  type ErrorState = Partial<Record<keyof FormData, string>>;

  const defaultFormData: FormData = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    clgName: '',
    course: '',
    class: '',
    div: '',
    rollNo: '',
    image: undefined,
  };

  const [formData, setFormData] = React.useState<FormData>(defaultFormData);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("formData");
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    }
  }, []);

  const [step, setStep] = React.useState<number>(0);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("step");
      if (saved) {
        setStep(parseInt(saved));
      }
    }
  }, []);

  const [formErrors, setFormErrors] = React.useState<ErrorState>({});

  const CurrentStep = stepArray[step];

  React.useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  React.useEffect(() => {
    localStorage.setItem("step", step.toString());
  }, [step]);

  const validateStep = (step: number): Partial<Record<keyof FormData, string>> => {
    const errors: ErrorState = {};

    if (step === 0) {
      if (!formData.firstname.trim()) errors.firstname = "First name is required";
      if (!formData.lastname.trim()) errors.lastname = "Last name is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format";
      if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone number must be 10 digits";
    }

    if (step === 1) {
      if (!formData.clgName.trim()) errors.clgName = "College name is required";
      if (!formData.course.trim()) errors.course = "Course is required";
      if (!/^[A-Za-z0-9]+$/.test(formData.class.trim())) errors.class = "Class should be alphanumeric";
      if (!/^[A-Z]$/.test(formData.div.trim())) errors.div = "Div should be a single uppercase letter";
      if (!/^\d{1,3}$/.test(formData.rollNo.trim())) errors.rollNo = "Roll No should be 1–3 digit number";
    }

    if (step === 2) {
      if (!formData.image) {
        errors.image = "Please upload an image";
      }
    }

    return errors;
  };

  const nextStep = () => {
    const errors = validateStep(step);
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      setStep((prev) => Math.min(prev + 1, stepLength - 1));
    } else {
      console.log("Validation failed:", errors);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key as keyof typeof formData] as any);
      }
  
      const res = await fetch('/api/submit', {
        method: 'POST',
        body: form,
      });
  
      console.log("Status:", res.status); // ✅ Add this
  
      const result = await res.json(); // 🔥 This might throw if the body is empty or invalid JSON
      console.log("Result:", result);
  
      if (!res.ok || !result.success) {
        throw new Error("Submission failed");
      }
  
      // Success handling here...
    } catch (err) {
      console.error("Submit error", err);
      alert("Something went wrong.");
    }
  };  

  return (
    <div className="flex-center flex-col [&>*]:w-full mt-15">
      <section className="py-[30px]">
        <div className="flex-center mb-[25px] text-3xl font-bold">
          <h1>Student Details</h1>
        </div>
        <Accordion stepNo={step}></Accordion>
      </section>
      <section>
        <form className="w-full max-w-xl min-h-[400px] bg-gray-60 shadow-lg p-6 rounded-3xl bg-white min-w-[500px] s">
          <CurrentStep formData={formData} setFormData={setFormData} formErrors={formErrors} />
          <Buttons step={step} maxStep={stepLength-1} nextStep={nextStep} prevStep={prevStep} handleSubmit={handleSubmit} />
        </form>
      </section>
    </div> 
  );
}