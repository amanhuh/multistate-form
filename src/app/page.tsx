"use client";

import Image from "next/image";
import React from "react";
import Accordion from "@/components/accordion";
import * as Steps from "@/components/formPages";
import Buttons from "@/components/Buttons";

const stepArray = Object.values(Steps);
const stepLength = stepArray.length;

export default function Home() {
  const [step, setStep] = React.useState<number>(0);
  const CurrentStep = stepArray[step];
  const [formData, setFormData] = React.useState({});
  const [formErrors, setFormErrors] = React.useState([{}]);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, stepLength - 1));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
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
        <form className="bg-gray-60 shadow-lg p-6 rounded-3xl bg-white min-w-3xs min-h-[25vh]">
          <CurrentStep />
          <Buttons step={step} maxStep={stepLength-1} nextStep={nextStep} prevStep={prevStep} />
        </form>
      </section>
    </div> 
  );
}