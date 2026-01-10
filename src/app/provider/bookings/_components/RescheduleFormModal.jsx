"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";

const RescheduleFormModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
  const { selectedId } = useAppContext();
  const isEditMode = Boolean(selectedId);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-y-auto ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h6 className="text-lg font-semibold mx-auto">
            Reschedule Appointment
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1  gap-5 justify-center">
            {/* Appointment Date */}
            <div>
              <label className="block text-sm text-gray-800">
                Appointment Date
              </label>
              <input
                type="date"
                {...register("AppointmentDate", {
                  required: !isEditMode && "Appointment Date is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.AppointmentDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.AppointmentDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-800">
                Appointment Time
              </label>
              <input
                type="time"
                {...register("AppointmentTime", {
                  required: !isEditMode && "Appointment Time is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.AppointmentTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.AppointmentTime.message}
                </p>
              )}
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

export default RescheduleFormModal;
