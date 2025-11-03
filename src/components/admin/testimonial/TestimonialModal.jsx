"use client";

import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { useRef, useState } from "react";

const TestimonialModal = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      jobTitle: "",
      rating: 0,
      content: "",
      status: true,
    },
  });

  const rating = watch("rating");

  // State for preview
  const [preview, setPreview] = useState("https://i.pravatar.cc/80");

  // Ref for file input
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Open file browser
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Show preview
      setValue("image", file); // Save to form
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">Add Testimonial</h6>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Upload */}
          <div className="flex items-center gap-3">
            <img
              src={preview}
              alt="preview"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleUploadClick}
                className="px-3 py-1 bg-[var(--primary-blue)]/10 text-blue-500 border border-[var(--primary-blue)]/10 rounded-md text-sm"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setPreview("https://i.pravatar.cc/80")}
                className="px-3 py-1 text-red-500 border border-red-500 rounded-md text-sm"
              >
                Remove
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            * Recommends a minimum size of 320 x 320 pixels. Allowed files .png
            and .jpg.
          </p>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Job Title */}
          <input
            type="text"
            placeholder="Job Title"
            {...register("jobTitle")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Ratings */}
          <div>
            <label className="block mb-1 text-sm font-medium">Ratings</label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  size={22}
                  onClick={() => setValue("rating", i + 1)}
                  className={`cursor-pointer ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <textarea
            rows={3}
            placeholder="Content"
            {...register("content")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Status */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Status</label>
            <input
              type="checkbox"
              {...register("status")}
              className="toggle toggle-success"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 text-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary-blue)] text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialModal;
