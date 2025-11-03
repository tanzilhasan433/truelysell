"use client";

import AddBookingModal from "@/components/provider/booking/AddBookingModal";
import BookingListComponent from "@/components/provider/booking/BookingListComponent";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
const ProviderBookingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestimonial = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Booking List</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--dark)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Bookings
        </button>
      </div>
      {/* data */}
      <BookingListComponent />
      <AddBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
        role=""
      />
    </div>
  );
};

export default ProviderBookingsPage;
