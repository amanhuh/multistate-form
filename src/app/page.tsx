"use client";

import Image from "next/image";
import React from "react";
import Accordion from "@/components/accordion";
import * as Steps from "@/components/formPages";
import Buttons from "@/components/Buttons";

const stepArray = Object.values(Steps);
const stepLength = stepArray.length;

export interface FormData {
  userId?: string;
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

export type PartialFormData = Partial<FormData> & { email: string };

export default function Home() {
  type ErrorState = Partial<Record<keyof FormData, string>>;

  const defaultFormData: FormData = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    clgName: "",
    course: "",
    class: "",
    div: "",
    rollNo: "",
    image: undefined,
  };

  const [formData, setFormData] = React.useState<FormData>(defaultFormData);
  const [step, setStep] = React.useState<number>(0);
  const [formErrors, setFormErrors] = React.useState<ErrorState>({});
  const CurrentStep = stepArray[step];

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("formData");
      const savedStep = localStorage.getItem("step");
      if (saved) setFormData(JSON.parse(saved));
      if (savedStep) setStep(parseInt(savedStep));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  React.useEffect(() => {
    localStorage.setItem("step", step.toString());
  }, [step]);

  const validateStep = (step: number): ErrorState => {
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
      if (!formData.image) errors.image = "Please upload an image";
    }

    return errors;
  };

  const patchStepData = async () => {
    const partial: PartialFormData = { email: formData.email };
    const formDataToSend = new FormData();

    if (step === 0) {
      partial.firstname = formData.firstname;
      partial.lastname = formData.lastname;
      partial.phone = formData.phone;
    } else if (step === 1) {
      partial.clgName = formData.clgName;
      partial.course = formData.course;
      partial.class = formData.class;
      partial.div = formData.div;
      partial.rollNo = formData.rollNo;
    } else if (step === 2 && formData.image) {  
      formDataToSend.append("email", formData.email);
      formDataToSend.append("image", formData.image);
    }

    await fetch("/api/formData", {
      method: "PATCH",
      body: formDataToSend,
    });

  };

  const nextStep = async () => {
    const errors = validateStep(step);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (step == 0 ) {
        await postStepData();
      } else {
        await patchStepData();
      }
      setStep((prev) => Math.min(prev + 1, stepLength - 1));
    } else {
      console.log("Validation failed:", errors);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const postStepData = async () => {
    const submitData = new FormData();
    submitData.append("firstname", formData.firstname);
    submitData.append("lastname", formData.lastname);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("clgName", formData.clgName);
    submitData.append("course", formData.course);
    submitData.append("class", formData.class);
    submitData.append("div", formData.div);
    submitData.append("rollNo", formData.rollNo);
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    const res = await fetch("/api/formData", {
      method: "POST",
      body: submitData,
    });

    const data = await res.json();
    console.log(data);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await patchStepData();
  };

  return (
    <div className="flex-center flex-col [&>*]:w-full mt-15">
      <section className="py-[30px]">
        <div className="flex-center mb-[25px] text-3xl font-bold">
          <h1>Student Details</h1>
        </div>
        <Accordion stepNo={step} />
      </section>
      <section>
        <form className="w-full max-w-xl min-h-[400px] bg-gray-60 shadow-lg p-6 rounded-3xl bg-white md:min-w-[500px]" onSubmit={handleSubmit}>
          <CurrentStep formData={formData} setFormData={setFormData} formErrors={formErrors} />
          <Buttons step={step} maxStep={stepLength - 1} nextStep={nextStep} prevStep={prevStep} />
        </form>
      </section>
    </div>
  );
}
