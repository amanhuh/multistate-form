"use client";
import Image from "next/image";
import React from "react";
import Accordion from "@/components/accordion";
import * as Steps from "@/components/formPages";

const stepArray = Object.values(Steps);
const stepLength = stepArray.length;

export default function Home() {
  const [step, setStep] = React.useState<number>(1);
  const [formData, setFormData] = React.useState({});
  const [formErrors, setFormErrors] = React.useState([{}]);

  const nextStep = () => { 
    setStep((step) => step + 1);
  }

  const prevStep = () => { 
    setStep((step) => step - 1);
  }



  return (
    <div className="flex-center flex-col [&>*]:w-full">
      <section className="py-[30px]">
        <div className="flex-center mb-[25px] text-3xl font-bold">
          <h1>Student Details</h1>
        </div>
        <Accordion stepNo={step}></Accordion>
      </section>
      <section>
        <form className="bg-gray-60 shadow-md p-4 rounded-3xl bg-gray-100 min-w-3xs min-h-[25vh]">

          {/* {renderStep()} */}
        </form>
      </section>
    </div> 
  );
}