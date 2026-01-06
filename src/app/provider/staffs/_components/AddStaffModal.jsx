"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useProviderStaff } from "@/hooks/provider/useProviderStaff";
import { useAppContext } from "@/context/AppContext";
import StaffLocationSelect from "./StaffLocationSelect";
import { BsPersonCircle } from "react-icons/bs";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { baseProviderURL } from "@/services/apiService";
import Select from "react-select";

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
      FirstName: "",
      LastName: "",
      Email: "",
      MobileNumber: "",
      Password: "",
      DateOfBirth: "",
      PostalCode: "",
      Address: "",
      Bio: "",
      divisionId: [],
      districtId: [],
      upazilaId: [],
      CategoryId: [],
      SubCategoryId: [],
      Gender: "",
      IsActive: true,
      Photo: null,
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
    getDistrictByDivision,
    getUpazilaByDistrict,
    getSubCategories,
  } = useProviderStaff();
  const isEditMode = Boolean(selectedId);

  const [preview, setPreview] = useState("");
  const [nidPreview, setNidPreview] = useState("");
  const fileInputRef = useRef(null);
  const nidFileInputRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const handleCategoryChange = (selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedCategories(selectedOptions || []);
    setValue("CategoryId", ids);

    if (ids.length > 0) {
      getSubCategories(ids);
      setIsSubCategoryDisabled(false);
    } else {
      setIsSubCategoryDisabled(true);
    }

    setAllSubCategoryData([]);
    setSelectedSubCategories([]);
    setValue("SubCategoryId", []);
  };

  const handleSubCategoryChange = (selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedSubCategories(selectedOptions || []);
    setValue("SubCategoryId", ids);
  };

  const subCategoriesOptions = allSubCategoryData.map((sub) => ({
    value: sub.id,
    label: sub.name,
  }));

  const categories = allCategoryData.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  useEffect(() => {
    if (singleData && selectedId) {
      reset({
        FirstName: singleData.firstName,
        LastName: singleData.lastName,
        Email: singleData.email,
        MobileNumber: singleData.mobileNumber,
        Password: singleData.password,
        DateOfBirth: singleData.dateOfBirth,
        Address: singleData.address,
        Bio: singleData.bio,
        PostalCode: singleData.postalCode,
        IsActive: singleData.isActive,
        Photo: singleData.photo,
        NidFile: singleData.nidFile,
        divisionId: [singleData.divisionId],
        districtId: [singleData.districtId],
        upazilaId: [singleData.upazilaId],

        CategoryId: singleData.categoryId || [],
        SubCategoryId: singleData.subCategoryId || [],

        Gender:
          singleData.gender === "male"
            ? 0
            : singleData.gender === "female"
            ? 1
            : 2,
      });

      if (singleData?.divisionId) {
        getDistrictByDivision([singleData.divisionId]);
      }
      if (singleData?.districtId) {
        getUpazilaByDistrict([singleData?.districtId]);
      }
      if (singleData?.categoryId) {
        getSubCategories(singleData?.categoryId);
      }
      if (singleData.profileImageUrl) {
        setPreview(
          `${baseProviderURL}files/provider-staff/${singleData.profileImageUrl}`
        );
      }
      if (singleData.nidFileUrl) {
        setNidPreview(
          `${baseProviderURL}files/provider-staff/${singleData.nidFileUrl?.[0]}`
        );
      }
    }
  }, [singleData, selectedId]);

  useEffect(() => {
    if (singleData && allCategoryData.length > 0) {
      const selectedCats = allCategoryData
        .filter((cat) => singleData.categoryId.includes(cat.id))
        .map((cat) => ({ value: cat.id, label: cat.name }));

      setSelectedCategories(selectedCats);
    }
  }, [singleData, allCategoryData]);

  useEffect(() => {
    if (singleData && allSubCategoryData.length > 0) {
      const selectedSubs = allSubCategoryData
        .filter((sub) => singleData.subCategoryId.includes(sub.id))
        .map((sub) => ({ value: sub.id, label: sub.name }));

      setSelectedSubCategories(selectedSubs);
    }
  }, [singleData, allSubCategoryData]);

  const gen = [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
    { value: 2, label: "Other" },
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

            setPreview("");
            setNidPreview("");
            console.log("submitted data:", data);
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
                      setValue("Photo", null);
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
              {...register("Photo", {
                required: !isEditMode && "Photo is required",
              })}
              ref={(el) => {
                fileInputRef.current = el;
              }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setValue("Photo", file, { shouldValidate: true });
                }
              }}
              className="hidden"
            />
            {errors.Photo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Photo.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
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
              <label className="block text-sm text-gray-800">
                Phone Number
              </label>
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
                <input
                  type="password"
                  {...register("Password", {
                    required: !isEditMode && "Password is required",
                  })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
                />
                {errors.Password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.Password.message}
                  </p>
                )}
              </div>
            )}

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
                  required: !isEditMode && "Gender is required",
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
                htmlFor="CategoryId"
                className="block text-sm text-gray-800"
              >
                Category
              </label>

              <Select
                id="CategoryId"
                options={categories}
                isMulti
                value={selectedCategories}
                onChange={handleCategoryChange}
                placeholder="Select Category"
                className="mt-1"
                classNames={{
                  control: () =>
                    "mt-1 block w-full rounded-xl text-gray-600 text-sm border border-gray-300 py-0.5 focus:outline-none",
                }}
              />

              {errors.CategoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.CategoryId.message}
                </p>
              )}
            </div>
            {/* sub category Title */}
            <div>
              <label
                htmlFor="SubCategoryId"
                className="block text-sm text-gray-800"
              >
                Sub Category
              </label>

              <Select
                id="SubCategoryId"
                options={subCategoriesOptions}
                isMulti
                isDisabled={isSubCategoryDisabled}
                value={selectedSubCategories}
                onChange={handleSubCategoryChange}
                placeholder="Select Sub Category"
                className="mt-1"
                classNames={{
                  control: () =>
                    `mt-1 block w-full rounded-xl text-gray-600 text-sm border border-gray-300 py-0.5 focus:outline-none ${
                      isSubCategoryDisabled
                        ? "bg-gray-100 cursor-not-allowed"
                        : ""
                    }`,
                }}
              />

              {errors.SubCategoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.SubCategoryId.message}
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
                required: !isEditMode && "Bio is required",
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
                onClick={() => nidFileInputRef?.current?.click()}
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
            {nidPreview && (
              <div className="relative my-5 inline-block">
                <img
                  src={nidPreview}
                  alt="preview"
                  className="w-16 h-16  object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setNidPreview("");
                    setValue("NidFile", null);
                  }}
                  className=" text-red-500  m-1 absolute top-0 right-0 z-20"
                >
                  <FaRegTrashCan />
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, application/pdf"
              multiple
              {...register("NidFile", {
                required: !isEditMode && "NID is required",
              })}
              ref={(el) => {
                nidFileInputRef.current = el;
              }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setNidPreview(URL.createObjectURL(file));
                  setValue("NidFile", file, { shouldValidate: true });
                }
              }}
              className="hidden"
            />

            {errors.NidFile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.NidFile.message}
              </p>
            )}
          </div>

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
            <button type="button" onClick={onClose} className="secondaryButton">
              Cancel
            </button>
            <button
              type="submit"
              className="darkButton"
              onClick={() => console.log("click")}
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
