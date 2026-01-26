"use client";

import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/AppContext";

const AddRebookForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onClose } = useAppContext();

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-y-auto ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h6 className="text-lg font-semibold mx-auto">Rebook</h6>
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
          <div className="grid grid-cols-1  gap-5 justify-center">
            {/* Appointment Date */}
            <div>
              <label className="block text-sm text-gray-800">
                Booking Date
              </label>
              <input
                type="date"
                {...register("bookingDate")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800">
                Booking Start Time
              </label>
              <input
                type="time"
                {...register("bookingStartTime")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800">
                Booking End Time
              </label>
              <input
                type="time"
                {...register("bookingEndTime")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-800">Message</label>
              <input
                type="text"
                {...register("message", {
                  required: "This is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Use Same Staff</label>
              <input
                type="checkbox"
                {...register("useSameStaff")}
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

export default AddRebookForm;
