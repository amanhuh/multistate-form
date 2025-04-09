import React from "react";

export default function ThankYou({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-white rounded-3xl shadow-xl max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-green-600">🎉 Thank You!</h2>
      <p className="text-gray-700 mb-6">Your application has been successfully submitted.</p>
      <button
        onClick={onReset}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
      >
        Fill Another Application
      </button>
    </div>
  );
}
