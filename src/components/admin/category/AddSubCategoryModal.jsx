"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

const AddSubCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  subCategoryId,
  allCategoryData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      CategoryId: null,
    },
  });

  const isEditMode = Boolean(subCategoryId);
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef(null);
  const nameValue = watch("name");

  useEffect(() => {
    if (nameValue && !isEditMode) {
      const generatedSlug = nameValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setValue("slug", generatedSlug);
    }
  }, [nameValue, setValue, isEditMode]);

  const getSingleSubCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}subcategories/getsubcategoriesbyid/${subCategoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      const result = await response.json();

      if (response.ok && result.data) {
        const user = result.data;

        setValue("name", user.name || "");
        setValue("slug", user.slug || "");
        setValue("imageUrl", user.imageUrl || "");
        setValue("CategoryId", user.categoryId || null);
        if (user.imageUrl) {
          setPreview(
            `${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/subcategories/${user.imageUrl}`
          );
        } else {
          setPreview("");
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (subCategoryId) {
      getSingleSubCategory();
    } else {
      reset();
    }
  }, [subCategoryId, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white w-full max-w-md max-h-min rounded-xl shadow-lg p-6 relative my-5 overflow-y-auto sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit Sub Category" : "Add Sub Category"}
          </h6>
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
          <label
            htmlFor="CategoryId"
            className="text-sm font-medium text-gray-600"
          >
            Category
          </label>
          <select
            id="CategoryId"
            {...register("CategoryId", {
              required: !isEditMode && "Category is required",
            })}
            value={watch("CategoryId") || ""}
            onChange={(e) => setValue("CategoryId", e.target.value)}
            className="mt-1 block w-full rounded-md text-gray-800 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
          >
            <option value="" className="" disabled>
              Select Category
            </option>

            {allCategoryData.map((category) => (
              <option key={category.id} value={category.id} className="">
                {category.name}
              </option>
            ))}
          </select>
          {/*  Name */}
          <label className="text-sm font-medium text-gray-600  ">
            Sub Category Name
          </label>
          <input
            type="text"
            placeholder="name"
            {...register("name", {
              required: !isEditMode && "Name is required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-2"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}

          {/* slug */}
          <label className="text-sm font-medium text-gray-600 ">
            Sub Category Slug
          </label>
          <input
            type="text"
            placeholder="Slug"
            {...register("slug")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-2"
          />

          <div>
            <label className="text-sm font-medium text-gray-600">
              Sub Category Image
            </label>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => fileInputRef?.current?.click()}
                className="px-3 py-5 bg-gray-50 block w-full border-gray-300 border border-dashed rounded-md text-sm flex justify-center"
              >
                <IoCloudUploadOutline
                  size={50}
                  className="block w-full text-gray-600"
                />
              </button>
            </div>
            {preview && (
              <div className="relative my-5 inline-block">
                <img
                  src={preview}
                  alt="preview"
                  className="w-20 h-20 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview("");
                    setValue("SubCategoryImage", null);
                  }}
                  className="text-white bg-red-500 p-1 rounded m-1 absolute top-0 right-0 z-50"
                >
                  <FaRegTrashCan />
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={(el) => {
                fileInputRef.current = el; // manually assign ref
                register("SubCategoryImage", {
                  required: !isEditMode ? "Image is required" : false,
                });
              }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setValue("SubCategoryImage", file, { shouldValidate: true });
                }
              }}
              className="hidden"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
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
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
