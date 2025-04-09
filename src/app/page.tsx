"use client";

import React from "react";
import Accordion from "@/components/accordion";
import * as Steps from "@/components/formPages";
import Buttons from "@/components/Buttons";
import ThankYou from "@/components/ThankYou";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";


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
  const [alreadySubmittedOpen, setAlreadySubmittedOpen] = React.useState(false);


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
            console.log("result datastep")
            console.log(result.data.step+1)
            if (result.data.step !== undefined && result.data.step !== null) {
              setStep(result.data.step);
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
        if (formData.image instanceof File) {
          form.append("image", formData.image);
        }
      }
      if (step !== undefined) form.append("step", step.toString());
      if (submit) form.append("isSubmitted", "true");

      if (typeof window !== "undefined") {
        const data = localStorage.getItem("details");
        const savedDetails = data ? JSON.parse(data) : null;

        let rawText;

        const checkSubmit = await fetch(`/api/submit/check?email=${encodeURIComponent(formData.email)}&submit=true`);
        rawText = await checkSubmit.text();

        if (!checkSubmit.ok) {
          console.error("❌ Server returned error (submit check):", rawText);
          throw new Error("Server error on submission check");
        }

        let submitResult;
        try {
          submitResult = JSON.parse(rawText);
          if (submitResult?.alreadySubmitted) {
            setAlreadySubmittedOpen(true); 
            setFormData(defaultFormData); 
            return false;
          }
        } catch (err) {
          console.error("❌ JSON parse failed (submit check):", rawText);
          throw new Error("Invalid JSON response for submit check");
        }

        const checkExists = await fetch(`/api/submit/check?email=${encodeURIComponent(formData.email)}&submit=false`);
        rawText = await checkExists.text();

        if (!checkExists.ok) {
          console.error("❌ Server returned error (existence check):", rawText);
          throw new Error("Server error on existence check");
        }

        let existsResult;
        let existingId = null;
        try {
          existsResult = JSON.parse(rawText);
          console.log(existsResult)
          existingId = existsResult?.data?._id || null;
          existsResult = existsResult?.exists
        } catch (err) {
          console.error("❌ JSON parse failed (existence check):", rawText);
          throw new Error("Invalid JSON response for existence check");
        }

        let res;
        if (!existingId) {
          console.log("post")
          res = await fetch("/api/submit", {
            method: "POST",
            body: form,
          });
        } else {
          console.log("patch")
          const idToPatch = existingId;
          if (!idToPatch) {
            console.error("❌ Could not determine ID to patch.");
            throw new Error("Missing ID for patch");
          }

          res = await fetch(`/api/submit/${idToPatch}`, {
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
        localStorage.setItem("details", JSON.stringify({ email: formData.email, _id: result.data._id }));
  
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
        <Dialog open={alreadySubmittedOpen} onOpenChange={setAlreadySubmittedOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Form Already Submitted</DialogTitle>
              <DialogDescription>
                This email has already submitted the form. You cannot submit again.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={() => setAlreadySubmittedOpen(false)}>OK</Button>
            </div>
          </DialogContent>
        </Dialog>

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