"use client";
import Image from "next/image";
import React from "react";
import Accordion from "@/components/accordion";
import StepOne from "@/components/formPages/stepOne";
import StepTwo from "@/components/formPages/stepTwo";
import StepThree from "@/components/formPages/stepThree";

export default function Home() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({});
  const [formErrors, setFormErrors] = React.useState([{}]);

  const nextStep = () => { 
    setStep((step) => step + 1);
  }

  const prevStep = () => { 
    setStep((step) => step - 1);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return <StepOne />;
    }
  }

  return (
    <div className="flex-center flex-col [&>*]:w-full">
      <section>
        <Accordion></Accordion>
      </section>
      <section>
        <form className="border border-black rounded-4xl bg-gray-50 min-w-3xs min-h-[25vh]">
        </form>
      </section>
    </div> 
  );
}
