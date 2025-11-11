"use client";

import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";

const TestimonialModal = ({ isOpen, onClose, onSubmit, testimonialId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      JobTitle: "",
      Ratings: 0,
      Content: "",
      IsActive: true,
    },
  });

  const Ratings = watch("Ratings");
  const isEditMode = Boolean(testimonialId);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);

  const getTestimonial = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}testimonial/gettestimonialsbyid/${testimonialId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      const result = await response.json();

      if (response.ok && result.data) {
        const testData = result.data;
        console.log("sing testimonial", result);
        setValue("Name", testData.name || "");
        setValue("Content", testData.content || "");
        setValue("IsActive", testData.isActive);
        setValue("JobTitle", testData.jobTitle);
        setValue("Ratings", testData.ratings);
        setValue("PersonImage", testData.imageUrl || "");
        if (testData.imageUrl) {
          setPreview(
            `${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/testimonial/${testData.imageUrl}`
          );
        } else {
          setPreview("");
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (testimonialId) {
      getTestimonial();
    } else {
      reset();
    }
  }, [testimonialId, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit Testimonial" : "Add Testimonial"}
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
          {/* Upload */}
          <div className="flex items-center gap-3">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <BsPersonCircle size={30} className="text-gray-500" />
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
          <p className="text-xs text-gray-500">
            * Recommends a minimum size of 320 x 320 pixels. Allowed files .png
            and .jpg.
          </p>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={(el) => {
              fileInputRef.current = el;
              register("PersonImage", {
                required: !isEditMode ? "Image is required" : false,
              });
            }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
                setValue("PersonImage", file, { shouldValidate: true });
              }
            }}
            className="hidden"
          />
          {errors.PersonImage && (
            <p className="text-red-500 text-xs mt-1">
              {errors.PersonImage.message}
            </p>
          )}

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            {...register("Name", {
              required: !isEditMode ? "Name is required" : false,
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
          {errors.Name && (
            <p className="text-red-500 text-xs mt-1">{errors.Name.message}</p>
          )}

          {/* Job Title */}
          <input
            type="text"
            placeholder="Job Title"
            {...register("JobTitle", {
              required: !isEditMode ? "Job Title is required" : false,
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {errors.JobTitle && (
            <p className="text-red-500 text-xs mt-1">
              {errors.JobTitle.message}
            </p>
          )}
          {/* Ratings */}
          <div>
            <label className="block mb-1 text-sm font-medium">Ratings</label>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  size={22}
                  onClick={() => setValue("Ratings", i + 1)}
                  className={`cursor-pointer ${
                    i < Ratings ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            {errors.Ratings && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Ratings.message}
              </p>
            )}
          </div>

          {/* Content */}
          <textarea
            rows={3}
            placeholder="Content"
            {...register("Content", {
              required: !isEditMode ? "Content is required" : false,
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
          {errors.Content && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Content.message}
            </p>
          )}

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
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialModal;
