"use client";

import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/AppContext";
import { useProviderOffer } from "@/hooks/provider/useProviderOffer";
import { useEffect } from "react";

const AddOfferModal = ({ onSubmit }) => {
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
  const { singleData } = useProviderOffer();
  const isEditMode = Boolean(selectedId);

  useEffect(() => {
    if (singleData && selectedId) {
      reset({
        serviceId: singleData.serviceId,
        offerTitle: singleData.offerTitle,
        discountType: singleData.discountType,
        discountValue: singleData.discountValue,
        startDate: singleData.startDate,
        endDate: singleData.endDate,
        description: singleData.description,
        isActive: singleData.isActive,
      });
    } else {
      reset({
        serviceId: null,
        offerTitle: "",
        discountType: "",
        discountValue: "",
        startDate: "",
        endDate: "",
        description: "",
        isActive: true,
      });
    }
  }, [singleData, selectedId]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">Add Offer</h6>
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
          <div>
            <label className="block text-sm text-gray-800">Offer Type</label>
            <select
              {...register("offerType")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select Offer Type
              </option>
              <option value="fixed">Fixed</option>
            </select>
            {errors.FirstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.FirstName.message}
              </p>
            )}
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-800">Offer Price</label>
            <input
              type="text"
              placeholder="Offe Price"
              {...register("cardNumber", { required: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800">Start Date</label>
            <input
              type="date"
              {...register("cardNumber", { required: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800">End Date</label>
            <input
              type="date"
              {...register("cardNumber", { required: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
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

export default AddOfferModal;
