// "use client";

// // import BookingComponent from "@/components/customer/booking/BookingComponent";
// import BookingList from "@/components/customer/booking/BookingList";

// const CustomerBookingPage = () => {
//   return <div>
//     this is booking pages..... 
//     {/* <BookingComponent></BookingComponent> */}
//     <BookingList></BookingList>
//   </div>;
// };

// export default CustomerBookingPage;

"use client";

import BookingList from "@/components/customer/booking/BookingList";

const CustomerBookingPage = () => {
  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center ">
        <h5 className="text-xl font-bold">Booking List</h5>
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <select className="p-2 border border-gray-300 rounded-md">
            <option>Newly Added</option>
            <option>Oldest</option>
            <option>Upcoming</option>
          </select>

          {/* Calendar Icon */}
          <button className="p-2 bg-gray-200 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
              />
            </svg>
          </button>

          {/* Filter Icon */}
          <button className="p-2 bg-gray-200 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Booking List Component */}
      <BookingList />
    </div>
  );
};

export default CustomerBookingPage;
