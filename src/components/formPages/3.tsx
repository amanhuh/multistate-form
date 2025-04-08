"use client";
import { useState, useEffect } from "react";
import { FormData } from "@/app/page";

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: Partial<Record<keyof FormData, string>>;
}

export default function Three({ formData, setFormData, formErrors }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (formData.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(formData.image);
    } else {
      setPreview(null);
    }
  }, [formData.image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();

    setFormData((prev) => ({ ...prev, image: undefined }));
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <p className="text-2xl font-bold mb-5 text-gray-800">Upload Profile Image</p>
      <div 
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-colors ${
          isDragging 
            ? "border-blue-500 bg-blue-50" 
            : formErrors.image 
              ? "border-red-300 bg-red-50" 
              : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-white"
            />
            <button 
              onClick={handleRemoveImage}
              type="button"
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 flex flex-col items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm">No Image</span>
          </div>
        )}
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500 text-sm text-center">
            {preview ? "Replace image" : "Drag & drop or click to upload"}
          </p>
          <label className="cursor-pointer bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            {preview ? "Change Image" : "Choose Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {formErrors.image && (
          <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>
        )}
      </div>
    </div>
  );
}