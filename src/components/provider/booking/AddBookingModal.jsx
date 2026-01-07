"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { useRef, useState } from "react";

const AddBookingModal = ({ isOpen, onClose, onSubmit, role }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      userName: "",
      phone: 0,
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      status: true,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">Add Bookings</h6>
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
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Staff
            </label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select
              </option>
              <option value="">John</option>
            </select>
          </div>
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Service
            </label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select
              </option>
              <option value="">Computer service</option>
            </select>
          </div>

          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Customer
            </label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select
              </option>
              <option value="">John</option>
            </select>
          </div>
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Staff
            </label>
            <input
              type="date"
              placeholder="Phone"
              {...register("phone")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            {/* <label htmlFor="" className="block text-sm text-gray-800">Staff</label> */}
            <input
              type="time"
              placeholder="Phone"
              {...register("phone")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            {/* <label htmlFor="" className="block text-sm text-gray-800">Staff</label> */}
            <input
              type="time"
              placeholder="Phone"
              {...register("phone")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Message
            </label>
            <textarea
              rows={3}
              placeholder="message"
              {...register("message")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
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

export default AddBookingModal;
