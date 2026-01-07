"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useBookingCustomer } from "@/hooks/provider/useBookingCustomer";
import { useAppContext } from "@/context/AppContext";

const AddCustomerModal = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
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
  const { selectedId, onClose } = useAppContext();
  const { singleData } = useBookingCustomer();
  const isEditMode = Boolean(selectedId);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [preview, setPreview] = useState("https://i.pravatar.cc/80");

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

  useEffect(() => {
    if (singleData && selectedId) {
      reset({
        Title: singleData.title,
        Details: singleData.details,
        Position: singleData.position,
        IsActive: singleData.isActive,
      });
    } else {
      reset({
        Title: "",
        Details: "",
        Position: "",
        IsActive: true,
      });
    }
  }, [singleData, selectedId]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center  bg-black/50 overflow-y-auto  ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto sidebar-scroll ">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 ">
          <h6 className="text-lg font-semibold mx-auto">Add Customer</h6>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data);
            reset();
            setPreview("");
          })}
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
                className="px-3 py-1 bg-(--primary-blue)/10 text-blue-500 border border-(--primary-blue)/10 rounded-md text-sm"
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

          {/* first name */}
          <div>
            <label className="block text-sm text-gray-800">First Name</label>
            <input
              type="text"
              {...register("FirstName", {
                required: !isEditMode && "First Name is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.FirstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.FirstName.message}
              </p>
            )}
          </div>
          {/* last name */}
          <div>
            <label className="block text-sm text-gray-800">Last Name</label>
            <input
              type="text"
              {...register("LastName", {
                required: !isEditMode && "Last Name is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.LastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.LastName.message}
              </p>
            )}
          </div>
          {/* email */}
          <div>
            <label className="block text-sm text-gray-800">Email</label>
            <input
              type="email"
              {...register("Email", {
                required: !isEditMode && "Email is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.Email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Email.message}
              </p>
            )}
          </div>
          {/* Phone Number */}
          <div>
            <label className="block text-sm text-gray-800">Phone Number</label>
            <input
              type="tel"
              {...register("MobileNumber", {
                required: !isEditMode && "Phone Number is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.MobileNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.MobileNumber.message}
              </p>
            )}
          </div>
          {/* password */}
          {!isEditMode && (
            <div>
              <label className="block text-sm text-gray-800">Password</label>
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
              {errors.Password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Password.message}
                </p>
              )}
            </div>
          )}
          {/* Address */}
          <div>
            <label className="block text-sm text-gray-800">Address</label>
            <input
              type="text"
              {...register("Address", {
                required: !isEditMode && "Address is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.Address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Address.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Diviion
            </label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select
              </option>
              <option value="">Dhaka</option>
            </select>
          </div>
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Zila
            </label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select
              </option>
              <option value="">Dhaka</option>
            </select>
          </div>
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Upazila
            </label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select
              </option>
              <option value="">Dhaka</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-800">Role</label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 "
            >
              <option value="" className="text-sm  ">
                Select Role
              </option>

              <option value="customer">Customer</option>
            </select>
          </div>

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
              className="px-4 py-2 bg-(--primary-blue) text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
