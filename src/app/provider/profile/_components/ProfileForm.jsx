"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useProviderProfile } from "@/hooks/provider/useProviderProfile";
import ProfileLocationSelect from "./ProfileLocationSelect";

const ProfileForm = ({ isEditMode, id }) => {
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
  const sameAsPermanent = watch("sameAsPermanent");

  const {
    allDivision,
    allDistrict,
    allUpazila,
    saveUser,
    getDistrictByDivision,
    getUpazilaByDistrict,
    profileInfo,
  } = useProviderProfile();

  useEffect(() => {
    const permanent = profileInfo.addresses?.[0]; // AddressType = 0
    const shop = profileInfo.addresses?.[1]; // AddressType = 1
    if (profileInfo) {
      reset({
        Name: profileInfo.name,
        Email: profileInfo.email,
        MobileNumber: profileInfo.mobileNumber,
        Gender: profileInfo.gender,
        DateOfBirth: profileInfo.dateOfBirth,
        Bio: profileInfo.bio,
        ProfileImage: profileInfo.profileImageUrl,

        // -------- Permanent Address --------
        permanentAddress: permanent?.address || "",
        permanentDivisionId: permanent?.divisionId || null,
        permanentDistrictId: permanent?.districtId || null,
        permanentUpazilaId: permanent?.upazilaId || null,

        // -------- Shop Address --------
        shopAddress: shop?.address || "",
        ShopName: shop?.shopName || "",
        shopDivisionId: shop?.divisionId || null,
        shopDistrictId: shop?.districtId || null,
        shopUpazilaId: shop?.upazilaId || null,

        sameAsPermanent: shop?.isSameAsPermanent ?? false,
      });
      setPreview(
        `${process.env.NEXT_PUBLIC_API_PROVIDER_URL}files/provider-profiles/${profileInfo.profileImageUrl}`
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
      });
    }
  }, [profileInfo]);

  useEffect(() => {
    if (sameAsPermanent) {
      setValue("shopDivisionId", watch("permanentDivisionId"));
      setValue("shopDistrictId", watch("permanentDistrictId"));
      setValue("shopUpazilaId", watch("permanentUpazilaId"));
      setValue("shopAddress", watch("permanentAddress"));
      setValue("ShopName", "Permanent");
    } else {
      setValue("shopDivisionId", null);
      setValue("shopDistrictId", null);
      setValue("shopUpazilaId", null);
      setValue("shopAddress", "");
      setValue("ShopName", "");
    }
  }, [sameAsPermanent]);

  const gen = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
    { value: 2, label: "Other" },
  ];

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit " : "Add "} Profile Information
          </h4>
        </div>

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
                    setValue("ProfileImage", null);
                  }}
                  className="px-3 py-1 text-red-500 border border-red-500 rounded-md text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Hidden file input */}
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

          {/* General Info */}
          <h5 className="mt-10">General Information</h5>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-800">Name</label>
            <input
              type="text"
              {...register("Name", {
                required: "Name is required",
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
              <label className="block text-sm text-gray-800">Email</label>
              <input
                type="email"
                {...register("Email")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
                disabled={true}
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm text-gray-800">
                Mobile Number
              </label>
              <input
                type="tel"
                {...register("MobileNumber")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
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

            {/* DOB */}
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

          {/* Bio */}
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

          {/* --- Permanent Address --- */}
          <h5 className="mt-10">Permanent Address</h5>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-800">Address</label>
              <input
                type="text"
                {...register("permanentAddress", {
                  required: "Address is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
            </div>

            <ProfileLocationSelect
              prefix="permanent"
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
          </div>

          {/* --- Shop Address --- */}
          <div className="flex items-center justify-between gap-2">
            <h5 className="mt-10">Shop Address</h5>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("sameAsPermanent")}
                className="toggle toggle-success"
              />
              <label className="text-sm font-medium text-gray-600">
                Same as permanent address
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-800">Shop Address</label>
            <input
              type="text"
              {...register("shopAddress", {
                required: "Shop Address is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-800">Shop Name</label>
              <input
                type="text"
                {...register("ShopName", {
                  required: "Shop Name is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
            </div>

            <ProfileLocationSelect
              prefix="shop"
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

export default ProfileForm;
