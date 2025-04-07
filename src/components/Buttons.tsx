
export default function Buttons({
    step,
    nextStep,
    prevStep,
  }: {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
  }) {
    return (
        <div className="w-full mt-6 flex flex-wrap gap-4">
        {/* Step 0: Only Continue */}
        {step === 0 && (
            <button
            type="button"
            onClick={nextStep}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl"
            >
            Continue
            </button>
        )}

        {/* Step 1: Back + Continue */}
        {step === 1 && (
            <>
            <button
                type="button"
                onClick={prevStep}
                className="w-1/2 bg-gray-300 text-gray-900 py-2 px-4 rounded-xl"
            >
                Back
            </button>
            <button
                type="button"
                onClick={nextStep}
                className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-xl"
            >
                Continue
            </button>
            </>
        )}

        {/* Step 2: Back + Review & Submit */}
        {step === 2 && (
            <>
            <button
                type="button"
                onClick={prevStep}
                className="w-1/2 bg-gray-300 text-gray-900 py-2 px-4 rounded-xl"
            >
                Back
            </button>
            <button
                type="button"
                onClick={nextStep}
                className="w-1/2 bg-green-600 text-white py-2 px-4 rounded-xl"
            >
                Review & Submit
            </button>
            </>
        )}

        {/* Step 3 (Review Step): Only Submit */}
        {step === 3 && (
            <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-xl"
            >
            Submit
            </button>
        )}
        </div>
    )
}