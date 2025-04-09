"use client";

import React from "react";
import Accordion from "@/components/accordion";
import * as Steps from "@/components/formPages";
import Buttons from "@/components/Buttons";
import { tr } from "motion/react-client";
import ThankYou from "@/components/ThankYou";

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
  step: number;
  isSubmitted: boolean;
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
    step: 0,
    isSubmitted: false
  };

  const [formData, setFormData] = React.useState<FormData>(defaultFormData);
  const [step, setStep] = React.useState<number>(0);
  const [formErrors, setFormErrors] = React.useState<ErrorState>({});
  const CurrentStep = stepArray[step];
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    const loadSavedDetails = async () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("details");
        if (!saved) return;
  
        try {
          const { email, _id } = JSON.parse(saved);
          const res = await fetch(`/api/submit/${_id}`);
          const result = await res.json();
  
          if (res.ok && result.data && result.data.email === email) {
            setFormData(result.data);
            if (result.data.step) {
              setStep(Number(result.data.step)+1);
            }
          } else {
            console.warn("No valid saved data found");
          }
        } catch (err) {
          console.error("Failed to load saved submission", err);
        }
      }
    };
  
    loadSavedDetails();
  }, []);

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
      setStep((prev) => Math.min(prev + 1, stepLength - 1));
      return true
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const validateStepFn = (step: number): boolean => {
    const errors = validateStep(step);
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }
  
    setFormErrors({});
    return true;
  };  

  const resetForm = () => {
    setFormData(defaultFormData);
    setFormErrors({});
    setStep(0);
    setSubmitted(false);
  };
  

  const handleSubmit = async (e?: React.FormEvent, step?: number, submit?: boolean): Promise<boolean> => {
    e?.preventDefault();
  
    try {
      const form = new FormData();
      for (const key in formData) {
        const value = formData[key as keyof typeof formData];
        if (value !== undefined && value !== null) {
          form.set(key, value as any); 
        }
      }
      if (step !== undefined) form.append("step", step.toString());
      if (submit) form.append("isSubmitted", "true");
  
      if (typeof window !== "undefined") {
        const data = localStorage.getItem("details");
        let savedDetails = data ? JSON.parse(data) : null;
  
        const check = await fetch(`/api/submit/check?email=${encodeURIComponent(formData.email)}`);
        const rawText = await check.text();
  
        if (!check.ok) {
          console.error("❌ Server returned error (raw text):", rawText);
          throw new Error("Server error");
        }
  
        let checkResult;
        try {
          checkResult = JSON.parse(rawText);
          console.log(checkResult);
          if (checkResult?.alreadySubmitted) {
            alert("This email has already submitted the form. You cannot submit again.");
            setFormData(defaultFormData);
            return false;
          }
        } catch (err) {
          console.error("❌ JSON parse failed:", rawText);
          throw new Error("Invalid JSON response");
        }
  
        let res;
        if (!savedDetails || savedDetails.email !== formData.email) {
          res = await fetch("/api/submit", {
            method: "POST",
            body: form,
          });
        } else {
          res = await fetch(`/api/submit/${savedDetails._id}`, {
            method: "PATCH",
            body: form,
          });
        }
  
        if (!res.ok) {
          const text = await res.text();
          console.error("❌ Server returned error:", text);
          throw new Error("Submit failed");
        }
  
        const result = await res.json();
        if (!savedDetails) {
          localStorage.setItem("details", JSON.stringify({ email: formData.email, _id: result.data._id }));
        }
  
        if (submit) {
          localStorage.removeItem("details");
          setSubmitted(true);

        }
  
        return true;
      }
    } catch (err) {
      console.error("Submit error", err);
      alert("Something went wrong while submitting the form.");
      return false;
    }
    return false;
  };
  
  
  return (
    <div className="flex-center flex-col [&>*]:w-full mt-15">
    {submitted ? (
      <ThankYou onReset={resetForm} />
    ) : (
      <>
        <section className="py-[30px]">
          <div className="flex-center mb-[25px] text-3xl font-bold">
            <h1>Student Details</h1>
          </div>
          <Accordion stepNo={step} />
        </section>
        <section>
          <form className="w-full max-w-xl min-h-[400px] bg-gray-60 shadow-lg p-6 rounded-3xl bg-white min-w-[500px]">
            <CurrentStep
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
            />
            <Buttons
              step={step}
              maxStep={stepLength - 1}
              nextStep={nextStep}
              prevStep={prevStep}
              validateStep={validateStepFn}
              handleSubmit={handleSubmit}
            />
          </form>
        </section>
      </>
    )}
  </div>
  );
}