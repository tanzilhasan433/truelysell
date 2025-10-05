"use client";

import { useState } from "react";

import { bookings } from "@/data/services";
import AllBooking from "@/components/admin/booking/AllBooking";

const pendingBookings = bookings.filter(
  (booking) => booking.status === "Pending"
);
const inProgressBookings = bookings.filter(
  (booking) => booking.status === "Inprogress"
);
const completedBookings = bookings.filter(
  (booking) => booking.status === "Completed"
);
const cancelledBookings = bookings.filter(
  (booking) => booking.status === "Cancelled"
);

const tabs = [
  { name: "All Booking", component: <AllBooking data={bookings} /> },
  { name: "Pending", component: <AllBooking data={pendingBookings} /> },
  { name: "Inaprogress", component: <AllBooking data={inProgressBookings} /> },
  { name: "Completed", component: <AllBooking data={completedBookings} /> },
  { name: "Cancelled", component: <AllBooking data={cancelledBookings} /> },
];

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState("All Booking");

  // Find the current tab’s component
  const ActiveComponent =
    tabs.find((tab) => tab.name === activeTab)?.component || (() => null);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4>Booking List</h4>
      </div>
      {/* Tab Navigation */}
      <nav className="flex space-x-6 border-b  border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.name
                ? "text-[var(--primary-blue)]"
                : "text-gray-600 hover:text-[var(--primary-blue)]"
            }`}
          >
            {tab.name}
            {activeTab === tab.name && (
              <span className="absolute left-0 -bottom-[1px] w-full h-0.5 bg-[var(--primary-blue)] rounded"></span>
            )}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="mt-4">{ActiveComponent}</div>
    </div>
  );
};

export default BookingPage;
