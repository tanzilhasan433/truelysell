"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import { MdLock, MdPerson } from "react-icons/md";

const RegistrationFormModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleRegistration = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1 px-4 py-2 rounded text-white font-medium text-sm 
                  bg-gradient-to-r from-[var(--primary)] to-[var(--primary-blue)] 
                  hover:opacity-90 transition-all duration-200"
      >
        <MdPerson size={15} />
        <span>Join Us</span>
      </button>

      {/* ... */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto ">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h6 className="text-lg font-semibold mx-auto">Add </h6>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(handleRegistration)}
              className="space-y-4"
            >
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
                * Recommends a minimum size of 320 x 320 pixels. Allowed files
                .png and .jpg.
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
                placeholder="User Name"
                {...register("userName")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              />
              {/* phone */}
              <input
                type="tel"
                placeholder="Phone"
                {...register("phone")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              />
              {/* phone */}
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              />
              {/* password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {/*confirm  password */}

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <select
                {...register("role")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 "
              >
                <option value="" className="text-sm  ">
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="provider">Provider</option>
                <option value="customer">Customer</option>
              </select>

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
                  onClick={() => setIsModalOpen(false)}
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
      )}

      {/* ... */}
    </div>
  );
};

export default RegistrationFormModal;
