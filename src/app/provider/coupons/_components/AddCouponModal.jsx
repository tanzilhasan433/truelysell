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
  const { singleData, serviceAllData } = useProviderCoupon();
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
                {...register("serviceId", {
                  required: !isEditMode && "Service is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none"
              >
                <option value="">Select </option>
                {serviceAllData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.serviceId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.serviceId.message}
                </p>
              )}
            </div>
            {/* coupon code */}
            <div>
              <label className="block text-sm text-gray-800">Coupon Code</label>
              <input
                type="text"
                {...register("couponCode", {
                  required: !isEditMode && "Coupon Code is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.couponCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.couponCode.message}
                </p>
              )}
            </div>
            {/* coupon Name */}
            <div>
              <label className="block text-sm text-gray-800">Coupon Name</label>
              <input
                type="text"
                {...register("couponName", {
                  required: !isEditMode && "Coupon Name is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.couponName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.couponName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-800">
                discountType
              </label>
              <select
                {...register("discountType", {
                  required: !isEditMode && "Discount Type is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none"
              >
                <option value="">Select </option>
                <option value="Percentage">Percentage </option>
                <option value="Fixed">Fixed </option>
              </select>
              {errors.discountType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.discountType.message}
                </p>
              )}
            </div>
            {/* Discount Value */}
            <div>
              <label className="block text-sm text-gray-800">
                Discount Value
              </label>
              <input
                type="number"
                {...register("discountValue", {
                  required: !isEditMode && "Discount Value is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.discountValue && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.discountValue.message}
                </p>
              )}
            </div>
            {/* Start date */}
            <div>
              <label className="block text-sm text-gray-800">Start Date</label>
              <input
                type="date"
                {...register("startDate", {
                  required: !isEditMode && "Start Date is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            {/* End date */}
            <div>
              <label className="block text-sm text-gray-800">End Date</label>
              <input
                type="date"
                {...register("endDate", {
                  required: !isEditMode && "End Date is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            {/* minimumOrderAmount */}
            <div>
              <label className="block text-sm text-gray-800">
                Minimum Order Amount
              </label>
              <input
                type="number"
                {...register("minimumOrderAmount", {
                  required: !isEditMode && "Minimum Order Amount is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.minimumOrderAmount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.minimumOrderAmount.message}
                </p>
              )}
            </div>

            {/* maximumDiscountAmount */}
            <div>
              <label className="block text-sm text-gray-800">
                Maximum Discount Amount
              </label>
              <input
                type="number"
                {...register("maximumDiscountAmount", {
                  required:
                    !isEditMode && "Maximum Discount Amount is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.maximumDiscountAmount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.maximumDiscountAmount.message}
                </p>
              )}
            </div>

            {/* usageLimit */}
            <div>
              <label className="block text-sm text-gray-800">Usage Limit</label>
              <input
                type="number"
                {...register("usageLimit", {
                  required: !isEditMode && "Usage Limit is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.usageLimit && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.usageLimit.message}
                </p>
              )}
            </div>
            {/* Status */}
            <div className="flex items-center gap-10">
              <label className="text-sm font-medium">Status</label>
              <input
                type="checkbox"
                {...register("isActive")}
                className="toggle toggle-success"
              />
            </div>
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
              className="px-4 py-2 bg-(--dark) text-white rounded-md"
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
