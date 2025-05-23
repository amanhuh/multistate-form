import React, { useEffect, useRef } from "react";

export default function Buttons({
  step,
  maxStep,
  nextStep,
  prevStep,
}: {
  step: number;
  maxStep: number;
  nextStep: () => void;
  prevStep: () => void;
}) {
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (step === maxStep) {
          submitButtonRef.current?.click();
        } else {
          nextButtonRef.current?.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, maxStep]);

  return (
    <div className="w-full mt-6 flex flex-wrap gap-4">
      {step === 0 && (
        <button
          type="button"
          onClick={nextStep}
          ref={nextButtonRef}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl cursor-pointer hover:opacity-85"
        >
          Continue
        </button>
      )}

      {step > 0 && step < maxStep - 1 && (
        <div className="w-full h-max flex flex-row gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/2 bg-gray-300 text-gray-900 py-2 px-4 rounded-xl cursor-pointer hover:opacity-85"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            ref={nextButtonRef}
            className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-xl cursor-pointer hover:opacity-85"
          >
            Continue
          </button>
        </div>
      )}

      {step === maxStep - 1 && step !== 0 && (
        <div className="w-full h-max flex flex-row gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/2 bg-gray-300 text-gray-900 py-2 px-4 rounded-xl cursor-pointer hover:opacity-85"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            ref={nextButtonRef}
            className="w-1/2 bg-green-600 text-white py-2 px-4 rounded-xl cursor-pointer hover:opacity-85"
          >
            Review & Submit
          </button>
        </div>
      )}

      {step === maxStep && (
        <div className="w-full h-max flex flex-row gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/2 bg-gray-300 text-gray-900 py-2 px-4 rounded-xl cursor-pointer hover:opacity-85"
          >
            Back
          </button>
          <button
            type="submit"
            ref={submitButtonRef}
            className="w-1/2 bg-green-700 text-white py-2 px-4 rounded-xl cursor-pointer hover:opacity-85"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
