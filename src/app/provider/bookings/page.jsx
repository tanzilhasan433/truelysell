"use client";

import AddBookingModal from "@/app/provider/bookings/_components/AddBookingModal";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import RescheduleFormModal from "./_components/RescheduleFormModal";
import { useProviderBooking } from "@/hooks/provider/useProviderBooking";
import ProviderBookingList from "./_components/ProviderBookingList";
import AddReviewForm from "./_components/AddReviewForm";
import { useAppContext } from "@/context/AppContext";
import AddRebookForm from "./_components/AddRebookForm";
import AddBookingCancleForm from "./_components/AddBookingCancleForm";
const ProviderBookingsPage = () => {
  const {
    loading,
    isModalOpen,
    setIsModalOpen,
    isRedscheduleModalOpen,
    isAddReviewModalOpen,
    isRebookModalOpen,
    isBookingCancle,
  } = useAppContext();
  const {
    handleAddReschedule,
    handleAddReview,
    saveData,
    handleAddRebook,
    handleBookingCancle,
  } = useProviderBooking();

  const [service, setService] = useState({});

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Booking List</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--dark) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Bookings
        </button>
      </div>
      {/* data */}
      <ProviderBookingList setService={setService} />

      {isModalOpen && <AddBookingModal onSubmit={saveData} />}
      {isRedscheduleModalOpen && (
        <RescheduleFormModal onSubmit={handleAddReschedule} />
      )}
      {isAddReviewModalOpen && (
        <AddReviewForm onSubmit={handleAddReview} item={service} />
      )}
      {isRebookModalOpen && <AddRebookForm onSubmit={handleAddRebook} />}
      {isBookingCancle && (
        <AddBookingCancleForm onSubmit={handleBookingCancle} />
      )}
    </div>
  );
};

export default ProviderBookingsPage;
