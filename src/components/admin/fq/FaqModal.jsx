"use client";

import { useForm } from "react-hook-form";

const FaqModal = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      category: "",
      answer: "",
      status: true,
    },
  });

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5 lg:h-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">Add Currency</h6>
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
          {/* Name */}
          <input
            type="text"
            placeholder="Title"
            {...register("faqTitle")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          <select
            {...register("category")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 "
          >
            <option value="" className="text-sm  ">
              Select Category
            </option>
            <option value="web">Web Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="writing">Content Writing</option>
          </select>

          {/* Content */}
          <textarea
            rows={3}
            placeholder="Answer"
            {...register("answer")}
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

export default FaqModal;
