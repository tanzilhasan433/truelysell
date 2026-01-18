"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useBookingCustomer } from "@/hooks/provider/useBookingCustomer";
import { useAppContext } from "@/context/AppContext";
import StaffLocationSelect from "../../staffs/_components/StaffLocationSelect";
import { BsPersonCircle } from "react-icons/bs";
import { baseProviderURL } from "@/services/apiService";

const AddCustomerModal = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { selectedId, onClose } = useAppContext();
  const {
    singleData,
    allUpazila,
    allDistrict,
    allDivision,
    getDistrictByDivision,
    getUpazilaByDistrict,
  } = useBookingCustomer();
  const isEditMode = Boolean(selectedId);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (singleData && selectedId) {
      reset({
        FirstName: singleData.firstName,
        LastName: singleData.lastName,
        Email: singleData.email,
        Password: singleData.password,
        Address: singleData.address,
        MobileNumber: singleData.mobileNumber,
        divisionId: [singleData.divisionId],
        districtId: [singleData.districtId],
        upazilaId: [singleData.upazilaId],
        IsActive: singleData.isActive,
      });
      if (singleData?.divisionId) {
        getDistrictByDivision([singleData.divisionId]);
      }
      if (singleData?.districtId) {
        getUpazilaByDistrict([singleData?.districtId]);
      }
      if (singleData.profileImageUrl) {
        setPreview(
          `${baseProviderURL}files/provider-customer/${singleData.profileImageUrl}`,
        );
      }
    } else {
      reset({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        Address: "",
        MobileNumber: 0,
        DivisionId: null,
        DistrictId: null,
        UpazilaId: null,
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

            setPreview("");
          })}
          className="space-y-4"
        >
          {/* Upload */}
          <div>
            <div className="flex items-center gap-3">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <BsPersonCircle size={40} className="text-gray-500" />
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef?.current?.click()}
                  className="px-3 py-1 bg-(--primary-blue)/10 text-blue-500 border border-(--primary-blue)/10 rounded-md text-sm"
                >
                  Upload
                </button>
                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreview("");
                      setValue("ProfileImage", null);
                    }}
                    className="px-3 py-1 text-red-500 border border-red-500 rounded-md text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml,"
              {...register("ProfileImage", {
                required: !isEditMode && "Photo is required",
              })}
              ref={(el) => {
                fileInputRef.current = el;
              }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setValue("ProfileImage", file, { shouldValidate: true });
                }
              }}
              className="hidden"
            />
            {errors.ProfileImage && (
              <p className="text-red-500 text-xs mt-1">
                {errors.ProfileImage.message}
              </p>
            )}
          </div>

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
          <StaffLocationSelect
            allDivision={allDivision}
            allDistrict={allDistrict}
            allUpazila={allUpazila}
            getDistrictByDivision={getDistrictByDivision}
            getUpazilaByDistrict={getUpazilaByDistrict}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />

          {/* Status */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Status</label>
            <input
              type="checkbox"
              {...register("IsActive")}
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
