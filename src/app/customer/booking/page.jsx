"use client";

import CustomerBookingList from "./_components/CustomerBookingList";

const CustomerBookingPage = () => {
  return (
    <div className="container mx-auto ">
      <h4 className=" mb-5 ">Booking List</h4>
      <CustomerBookingList />
    </div>
  );
};

export default CustomerBookingPage;
