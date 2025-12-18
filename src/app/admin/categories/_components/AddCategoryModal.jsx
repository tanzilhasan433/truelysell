"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAppContext } from "@/context/AppContext";
import { useCategory } from "@/hooks/admin/useCategory";

const AddCategoryModal = ({ onSubmit }) => {
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
      IsFeatured: false,
    },
  });

  const { selectedId, onClose } = useAppContext();
  const { singleData } = useCategory();
  const isEditMode = Boolean(selectedId);

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

  useEffect(() => {
    if (singleData && selectedId) {
      reset({
        name: singleData.name,
        slug: singleData.slug,
        imageUrl: singleData.imageUrl,
        IsFeatured: singleData.isFeatured,
      });
      if (singleData.imageUrl) {
        setPreview(
          `${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/categories/${singleData.imageUrl}`
        );
      }
    } else {
      reset({
        name: "",
        slug: "",
        imageUrl: "",
        IsFeatured: false,
      });
    }
  }, [singleData, selectedId]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white w-full max-w-md max-h-min rounded-xl shadow-lg p-6 relative my-5 overflow-y-auto sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit Category" : "Add Category"}
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
          {/*  Name */}
          <label className="text-sm font-medium text-gray-600  ">
            Category Name
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
            Category Slug
          </label>
          <input
            type="text"
            placeholder="Slug"
            {...register("slug")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-2"
          />

          <div>
            <label className="text-sm font-medium text-gray-600">
              Category Image
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
                    setValue("image", null);
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
                fileInputRef.current = el;
                register("image", {
                  required: !isEditMode ? "Image is required" : false,
                });
              }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setValue("image", file, { shouldValidate: true });
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

          {/* Status */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">
              Featured
            </label>
            <input
              type="checkbox"
              {...register("IsFeatured")}
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
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
