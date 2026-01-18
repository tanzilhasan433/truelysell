"use client";

import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/AppContext";
import { useProviderCoupon } from "@/hooks/provider/useProviderCoupon";
import { useEffect } from "react";

const AddCouponModal = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Title: "",
      Details: "",
      Position: null,
      IsActive: true,
    },
  });
  const { selectedId, onClose } = useAppContext();
  const { singleData } = useProviderCoupon();
  const isEditMode = Boolean(selectedId);
  console.log("Fetched datsingleData:", singleData);

  useEffect(() => {
    if (singleData && selectedId) {
      reset({
        couponCode: singleData.couponCode,
        discountType: singleData.discountType,
        discountValue: singleData.discountValue,
        minimumOrderAmount: singleData.minimumOrderAmount,
        maximumDiscountAmount: singleData.maximumDiscountAmount,
        startDate: singleData.startDate,
        endDate: singleData.endDate,
        usageLimit: singleData.usageLimit,
        serviceId: singleData.serviceId,
        isActive: singleData.isActive,
      });
    } else {
      reset({
        serviceId: null,
        couponCode: "",
        discountType: "",
        discountValue: "",
        minimumOrderAmount: "",
        maximumDiscountAmount: "",
        startDate: "",
        endDate: "",
        usageLimit: "",
        isActive: true,
      });
    }
  }, [singleData, selectedId]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h6 className="text-lg font-semibold mx-auto">Add Coupon</h6>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
            {/* service */}
            <div>
              <label className="block text-sm text-gray-800">Service</label>
              <select
                {...register("Gender", {
                  required: !isEditMode && "Gender is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none"
              >
                <option value="">Select </option>
                {/* {gen.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))} */}
              </select>
              {errors.Gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Gender.message}
                </p>
              )}
            </div>
            {/* Coupon name */}
            <div>
              <label className="block text-sm text-gray-800">Coupon Name</label>
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
            <div>
              <label className="block text-sm text-gray-800">Coupon Code</label>
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
            <div>
              <label className="block text-sm text-gray-800">Coupon type</label>
              <select
                {...register("Gender", {
                  required: !isEditMode && "Gender is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none"
              >
                <option value="">Select </option>
                {/* {gen.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))} */}
              </select>
              {errors.Gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Gender.message}
                </p>
              )}
            </div>
            {/* Start date */}
            <div>
              <label className="block text-sm text-gray-800">Start Date</label>
              <input
                type="date"
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
            {/* End date */}
            <div>
              <label className="block text-sm text-gray-800">End Date</label>
              <input
                type="date"
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
            {/* Company name */}
            <div>
              <label className="block text-sm text-gray-800">
                Company Name
              </label>
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
              className="px-4 py-2 bg-[var(--dark)] text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCouponModal;
