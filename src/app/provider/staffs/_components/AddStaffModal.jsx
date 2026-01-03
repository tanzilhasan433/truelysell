"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useProviderStaff } from "@/hooks/provider/useProviderStaff";
import { useAppContext } from "@/context/AppContext";

const AddStaffModal = ({ onSubmit }) => {
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
  const { singleData } = useProviderStaff();
  const isEditMode = Boolean(selectedId);
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
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5    overflow-y-auto sidebar-scroll ">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">Add Service Man</h6>
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

          <div>
            {/* Upload */}
            <div className="">
              <button
                type="button"
                onClick={() => fileInputRef?.current?.click()}
                className="px-3 py-5 bg-gray-50 block w-full border-gray-300 border border-dashed rounded-md text-sm flex justify-center"
              >
                <div>
                  <IoCloudUploadOutline
                    size={30}
                    className="block w-full text-gray-600"
                  />
                  <p className="text-gray-600">
                    Upload NID or Birth certificate
                  </p>
                </div>
              </button>
            </div>
            {preview && (
              <div className="relative my-5 inline-block">
                <img
                  src={preview}
                  alt="preview"
                  className="w-16 h-16  object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview("");
                    setValue("serviceImages", null);
                  }}
                  className=" text-red-500  m-1 absolute top-0 right-0 z-20"
                >
                  <FaRegTrashCan />
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/png, image/jpeg"
              multiple
              ref={(el) => {
                fileInputRef.current = el;
                register("serviceImages");
              }}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setPreview(URL.createObjectURL(files[0]));
                setValue("serviceImages", files, { shouldValidate: true });
              }}
              className="hidden"
            />

            {errors.serviceImages && (
              <p className="text-red-500 text-xs mt-1">
                {errors.serviceImages.message}
              </p>
            )}
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

export default AddStaffModal;
