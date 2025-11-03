"use client";

import BookingListComponent from "@/components/provider/booking/BookingListComponent";

const CustomerBookingPage = () => {
  return (
    <div className="container mx-auto ">
      <h4 className=" mb-5 ">Booking List</h4>
      <BookingListComponent />
    </div>
  );
};

export default CustomerBookingPage;
