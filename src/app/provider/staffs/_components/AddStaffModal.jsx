"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useProviderStaff } from "@/hooks/provider/useProviderStaff";
import { useAppContext } from "@/context/AppContext";
import StaffLocationSelect from "./StaffLocationSelect";

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
  const {
    singleData,
    allCategoryData,
    allSubCategoryData,
    setAllSubCategoryData,
    allUpazila,
    allDistrict,
    allDivision,
    isSubCategoryDisabled,
    setIsSubCategoryDisabled,
    noSubCategoryFound,
    setNoSubCategoryFound,
    getDistrictByDivision,
    getUpazilaByDistrict,
    getSubCategories,
  } = useProviderStaff();
  const isEditMode = Boolean(selectedId);

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

  const gen = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
    { value: 2, label: "Other" },
  ];
  const branchLocation = [
    { value: 0, label: "Branch 1" },
    { value: 1, label: "Branch 2" },
    { value: 2, label: "Branch 3" },
  ];
  const roles = [
    { value: 0, label: "Admin" },
    { value: 1, label: "Manager" },
    { value: 2, label: "Staff" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex justify-center  bg-black/50 overflow-y-auto  ">
      <div className="bg-white w-full lg:max-w-3/6 rounded-xl shadow-lg p-6 relative my-5    overflow-y-auto sidebar-scroll ">
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
          <div>
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

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
            {/* user name */}
            <div>
              <label className="block text-sm text-gray-800">User Name</label>
              <input
                type="text"
                {...register("UserName", {
                  required: !isEditMode && "Name is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.UserName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.UserName.message}
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
              <label className="block text-sm text-gray-800">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("PhoneNumber", {
                  required: !isEditMode && "Phone Number is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.PhoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.PhoneNumber.message}
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
                  required: !isEditMode && "Date of Birth is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.DateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.DateOfBirth.message}
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
            {/* locations */}
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
            {/* postal code */}
            <div>
              <label className="block text-sm text-gray-800">Postal Code</label>
              <input
                type="text"
                {...register("PostalCode", {
                  required: !isEditMode && "Postal Code is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.PostalCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.PostalCode.message}
                </p>
              )}
            </div>
            {/* Category */}
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm text-gray-800"
              >
                Category
              </label>
              <select
                id="categoryId"
                {...register("categoryId", {
                  required: !isEditMode && "Category is required",
                })}
                onChange={(e) => {
                  const selected = Number(e.target.value);
                  setValue("categoryId", selected);
                  setValue("subCategoryId", "");
                  if (selected) {
                    getSubCategories(selected);
                  } else {
                    setAllSubCategoryData([]);
                    setIsSubCategoryDisabled(true);
                    setNoSubCategoryFound(false);
                  }
                }}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select Category
                </option>
                {allCategoryData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            {/* sub category Title */}
            <div>
              <label
                htmlFor="subCategoryId"
                className="block text-sm text-gray-800"
              >
                Sub Category
              </label>
              <select
                id="subCategoryId"
                {...register("subCategoryId", {
                  required: !isEditMode && "Sub Category is required",
                })}
                disabled={isSubCategoryDisabled}
                className={`mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none ${
                  isSubCategoryDisabled ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="">
                  {noSubCategoryFound
                    ? "No Sub Category Found"
                    : "Please Select Sub Category"}
                </option>
                {allSubCategoryData.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
              {errors.subCategoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subCategoryId.message}
                </p>
              )}
            </div>
            {/* branch location */}
            <div>
              <label className="block text-sm text-gray-800">
                Branch Location
              </label>
              <select
                {...register("branchLocation", {
                  required: "Branch Location is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none"
              >
                <option value="">Select Branch Location</option>
                {branchLocation.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
              {errors.branchLocation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.branchLocation.message}
                </p>
              )}
            </div>
            {/* role */}
            <div>
              <label className="block text-sm text-gray-800">Role</label>
              <select
                {...register("role", {
                  required: "Role is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none"
              >
                <option value="">Select Role</option>
                {roles.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.role.message}
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

          {/* nid */}
          <div>
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
            <button type="button" onClick={onClose} className="secondaryButton">
              Cancel
            </button>
            <button type="submit" className="darkButton">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
