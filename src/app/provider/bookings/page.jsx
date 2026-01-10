"use client";

import AddBookingModal from "@/components/provider/booking/AddBookingModal";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import RescheduleFormModal from "./_components/RescheduleFormModal";
import { useProviderBooking } from "@/hooks/provider/useProviderBooking";
import ProviderBookingList from "./_components/ProviderBookingList";
import AddReviewForm from "./_components/AddReviewForm";
const ProviderBookingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { isRedscheduleModalOpen, setIsRedscheduleModalOpen } =
  //   useProviderBooking();
  const [isRedscheduleModalOpen, setIsRedscheduleModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [service, setService] = useState({});
  const handleAddBooking = (data) => {
    setIsModalOpen(false);
  };
  const handleAddReschedule = (data) => {
    setIsRedscheduleModalOpen(false);
  };
  const handleAddReview = (data) => {
    setIsAddReviewModalOpen(false);
    console.log("Review Data:", data);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Booking List</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--dark)s text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Bookings
        </button>
      </div>
      {/* data */}
      <ProviderBookingList
        setIsRedscheduleModalOpen={setIsRedscheduleModalOpen}
        setIsAddReviewModalOpen={setIsAddReviewModalOpen}
        setService={setService}
      />
      <AddBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBooking}
        role=""
      />
      <RescheduleFormModal
        isOpen={isRedscheduleModalOpen}
        onClose={() => setIsRedscheduleModalOpen(false)}
        onSubmit={handleAddReschedule}
      />
      <AddReviewForm
        isOpen={isAddReviewModalOpen}
        onClose={() => setIsAddReviewModalOpen(false)}
        onSubmit={handleAddReview}
        item={service}
      />
    </div>
  );
};

export default ProviderBookingsPage;
