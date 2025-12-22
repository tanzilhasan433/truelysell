"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";

import { useAdminProfile } from "@/hooks/admin/useAdminProfile";
import AdminProfileLocationSelect from "./AdminProfileLocationSelect";

const AdminProfileForm = ({ isEditMode, id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);

  const {
    allDivision,
    allDistrict,
    saveUser,
    getDistrictByDivision,
    profileInfo,
  } = useAdminProfile();

  useEffect(() => {
    if (profileInfo) {
      reset({
        Name: profileInfo.name,
        Email: profileInfo.email,
        MobileNumber: profileInfo.mobileNumber,
        Gender: profileInfo.gender,
        DateOfBirth: profileInfo.dateOfBirth,
        Bio: profileInfo.bio,
        ProfileImage: profileInfo.profileImageUrl,
        PermanentAddress: profileInfo.permanentAddress,
        PermanentDivisionId: profileInfo.permanentDivisionId,
        PermanentDistrictId: profileInfo.permanentDistrictId,
        CoverageAreaDistrictId: profileInfo.coverageAreaDistrictId,
        CoverageAreaDivisionId: profileInfo.coverageAreaDivisionId,
      });
      if (profileInfo.coverageAreaDivisionId) {
        getDistrictByDivision([profileInfo.coverageAreaDivisionId]);
      }
      if (profileInfo.permanentDivisionId) {
        getDistrictByDivision([profileInfo.permanentDivisionId]);
      }

      setPreview(
        `${process.env.NEXT_PUBLIC_API_PROVIDER_URL}files/admin-profile/${profileInfo.profileImageUrl}`
      );
    } else {
      reset({
        Name: "",
        Email: "",
        MobileNumber: "",
        Gender: "",
        DateOfBirth: "",
        Bio: "",
        ProfileImage: "",
        PermanentAddress: "",
        PermanentDivisionId: "",
        PermanentDistrictId: "",
        CoverageAreaDistrictId: "",
        CoverageAreaDivisionId: "",
      });
    }
  }, [profileInfo]);

  const gen = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
    { value: 2, label: "Other" },
  ];

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit " : "Add "} Profile Information
          </h4>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(saveUser)} className="space-y-4 mb-10">
          {/* Upload */}
          <h6>Profile Picture</h6>
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
                    setValue("image", null);
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
            accept="image/png, image/jpeg"
            {...register("ProfileImage", {
              required: !isEditMode ? "Image is required" : false,
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

          <h5 className="mt-10">General Information</h5>
          {/* Name */}
          <div>
            <label htmlFor="Name" className="block text-sm  text-gray-800">
              Name
            </label>
            <input
              type="text"
              {...register("Name", {
                required: !isEditMode ? "Name is required" : false,
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.Name && (
              <p className="text-red-500 text-xs mt-1">{errors.Name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Email */}
            <div>
              <label htmlFor="Email" className="block text-sm  text-gray-800">
                Email
              </label>
              <input
                type="email"
                {...register("Email", {
                  required: !isEditMode ? "Email is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.Email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Email.message}
                </p>
              )}
            </div>
            {/* Mobile */}
            <div>
              <label
                htmlFor="MobileNumber"
                className="block text-sm  text-gray-800"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                {...register("MobileNumber", {
                  required: !isEditMode ? "Mobile Number is required" : false,
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.MobileNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.MobileNumber.message}
                </p>
              )}
            </div>
            {/* Gender */}
            <div>
              <label className="block text-sm text-gray-800">Gender</label>
              <select
                {...register("Gender", {
                  required: "Gender is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none"
              >
                <option value="">Select gender</option>
                {gen.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
              {errors.Gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Gender.message}
                </p>
              )}
            </div>
            {/* Date of Birth */}
            <div>
              <label className="block text-sm text-gray-800">
                Date of Birth
              </label>
              <input
                type="date"
                {...register("DateOfBirth", {
                  required: "Date of Birth is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.DateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.DateOfBirth.message}
                </p>
              )}
            </div>
          </div>

          {/* bio */}
          <div>
            <label className="block text-sm text-gray-800">Your Bio</label>
            <textarea
              rows={3}
              {...register("Bio", {
                required: "Bio is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.Bio && (
              <p className="text-red-500 text-xs mt-1">{errors.Bio.message}</p>
            )}
          </div>
          <h5 className="mt-10">Permanent Address</h5>

          <div>
            <label
              htmlFor="PermanentAddress"
              className="block text-sm  text-gray-800"
            >
              Address
            </label>
            <input
              type="text"
              {...register("PermanentAddress", {
                required: !isEditMode ? "Address is required" : false,
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.PermanentAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.PermanentAddress.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AdminProfileLocationSelect
              allDivision={allDivision}
              allDistrict={allDistrict}
              getDistrictByDivision={getDistrictByDivision}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              prefix="Permanent"
            />
          </div>

          <div className="flex items-center justify-between gap-2 ">
            <h5 className="mt-10"> Coverage Area</h5>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AdminProfileLocationSelect
              allDivision={allDivision}
              allDistrict={allDistrict}
              getDistrictByDivision={getDistrictByDivision}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              prefix="CoverageArea"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 text-sm">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-(--primary-blue) text-white rounded-md"
            >
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileForm;
