"use client";

import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/AppContext";
import { useProviderBooking } from "@/hooks/provider/useProviderBooking";

const AddBookingModal = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onClose, selectedId } = useAppContext();
  const { staffData, serviceData, customerData } = useProviderBooking();
  const isEditMode = Boolean(selectedId);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">Add Bookings</h6>
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
          {/* staff */}
          <div>
            <label htmlFor="staffId" className="block text-sm text-gray-800">
              Staff
            </label>
            <select
              {...register("staffId", {
                required: !isEditMode && "Staff is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select
              </option>
              {staffData &&
                staffData.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name}
                  </option>
                ))}
            </select>
            {errors.staffId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.staffId.message}
              </p>
            )}
          </div>
          {/* Service */}
          <div>
            <label htmlFor="serviceId" className="block text-sm text-gray-800">
              Service
            </label>
            <select
              {...register("serviceId", {
                required: !isEditMode && "Service is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select
              </option>
              {serviceData &&
                serviceData.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
            </select>
            {errors.serviceId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.serviceId.message}
              </p>
            )}
          </div>
          {/* Customer */}
          <div>
            <label htmlFor="customerId" className="block text-sm text-gray-800">
              Customer
            </label>
            <select
              {...register("customerId")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 mt-1 "
            >
              <option value="" className="text-sm  ">
                Select
              </option>
              {customerData &&
                customerData.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
            </select>
            {errors.customerId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customerId.message}
              </p>
            )}
          </div>
          {/* bookingDate */}
          <div>
            <label
              htmlFor="bookingDate"
              className="block text-sm text-gray-800"
            >
              Booking Date
            </label>
            <input
              type="date"
              {...register("bookingDate", {
                required: !isEditMode && "Booking Date is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
            {errors.bookingDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.bookingDate.message}
              </p>
            )}
          </div>
          {/* Start Time */}
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Booking Start Time
            </label>
            <input
              type="time"
              placeholder="Phone"
              {...register("bookingStartTime", {
                required: !isEditMode && "Booking Start Time is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
            {errors.bookingStartTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.bookingStartTime.message}
              </p>
            )}
          </div>
          {/* end time */}
          <div>
            <label
              htmlFor="bookingEndTime"
              className="block text-sm text-gray-800"
            >
              Booking End Time
            </label>
            <input
              type="time"
              {...register("bookingEndTime", {
                required: !isEditMode && "Booking End Time is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
            {errors.bookingEndTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.bookingEndTime.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="" className="block text-sm text-gray-800">
              Message
            </label>
            <textarea
              rows={3}
              placeholder="message"
              {...register("message", {
                required: !isEditMode && "Message is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message.message}
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

export default AddBookingModal;
