// import React from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { FiCalendar } from 'react-icons/fi';

// // 1. Mock Data: We create an array of data based on your image.
// //    You'll need to add your own images to the /public/images/ folder.
// const bookingsData = [
//   {
//     id: 1,
//     service: 'Computer Repair',
//     date: '10 Nov 2022',
//     user: {
//       name: 'John Smith',
//       email: 'john@gmail.com',
//       avatar: '/images/avatar-john.jpg', // ADD YOUR IMAGE HERE
//     },
//     serviceImage: '/images/service-computer.jpg', // ADD YOUR IMAGE HERE
//   },
//   {
//     id: 2,
//     service: 'Car Repair',
//     date: '15 Oct 2022',
//     user: {
//       name: 'Timothy',
//       email: 'timothy@gmail.com',
//       avatar: '/images/avatar-timothy.jpg', // ADD YOUR IMAGE HERE
//     },
//     serviceImage: '/images/service-car.jpg', // ADD YOUR IMAGE HERE
//   },
//   {
//     id: 3,
//     service: 'Interior Designing',
//     date: '18 Oct 2022',
//     user: {
//       name: 'Jordan',
//       email: 'jordan@gmail.com',
//       avatar: '/images/avatar-jordan.jpg', // ADD YOUR IMAGE HERE
//     },
//     serviceImage: '/images/service-interior.jpg', // ADD YOUR IMAGE HERE
//   },
//   {
//     id: 4,
//     service: 'Steam Car Wash',
//     date: '28 Oct 2022',
//     user: {
//       name: 'Armand',
//       email: 'armand@gmail.com',
//       avatar: '/images/avatar-armand.jpg', // ADD YOUR IMAGE HERE
//     },
//     serviceImage: '/images/service-carwash.jpg', // ADD YOUR IMAGE HERE
//   },
//   {
//     id: 5,
//     service: 'House Cleaning',
//     date: '10 Nov 2022',
//     user: {
//       name: 'Joseph',
//       email: 'joseph@gmail.com',
//       avatar: '/images/avatar-joseph.jpg', // ADD YOUR IMAGE HERE
//     },
//     serviceImage: '/images/service-cleaning.jpg', // ADD YOUR IMAGE HERE
//   },
//   {
//     id: 6,
//     service: 'Car Repair',
//     date: '10 Nov 2022',
//     user: {
//       name: 'Adrian',
//       email: 'jadrian@gmail.com',
//       avatar: '/images/avatar-adrian.jpg', // ADD YOUR IMAGE HERE
//     },
//     serviceImage: '/images/service-car-2.jpg', // ADD YOUR IMAGE HERE
//   },
// ];
// const RecentBooking = () => {
//     return (
        
        
//     );
// };

// export default RecentBooking;






// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';

// 1. Mock Data: We create an array of data based on your image.
//    You'll need to add your own images to the /public/images/ folder.
const bookingsData = [
  {
    id: 1,
    service: 'Computer Repair',
    date: '10 Nov 2022',
    user: {
      name: 'John Smith',
      email: 'john@gmail.com',
      avatar: '/images/avatar-john.jpg', // ADD YOUR IMAGE HERE
    },
    serviceImage: '/images/service-computer.jpg', // ADD YOUR IMAGE HERE
  },
  {
    id: 2,
    service: 'Car Repair',
    date: '15 Oct 2022',
    user: {
      name: 'Timothy',
      email: 'timothy@gmail.com',
      avatar: '/images/avatar-timothy.jpg', // ADD YOUR IMAGE HERE
    },
    serviceImage: '/images/service-car.jpg', // ADD YOUR IMAGE HERE
  },
  {
    id: 3,
    service: 'Interior Designing',
    date: '18 Oct 2022',
    user: {
      name: 'Jordan',
      email: 'jordan@gmail.com',
      avatar: '/images/avatar-jordan.jpg', // ADD YOUR IMAGE HERE
    },
    serviceImage: '/images/service-interior.jpg', // ADD YOUR IMAGE HERE
  },
  {
    id: 4,
    service: 'Steam Car Wash',
    date: '28 Oct 2022',
    user: {
      name: 'Armand',
      email: 'armand@gmail.com',
      avatar: '/images/avatar-armand.jpg', // ADD YOUR IMAGE HERE
    },
    serviceImage: '/images/service-carwash.jpg', // ADD YOUR IMAGE HERE
  },
  {
    id: 5,
    service: 'House Cleaning',
    date: '10 Nov 2022',
    user: {
      name: 'Joseph',
      email: 'joseph@gmail.com',
      avatar: '/images/avatar-joseph.jpg', // ADD YOUR IMAGE HERE
    },
    serviceImage: '/images/service-cleaning.jpg', // ADD YOUR IMAGE HERE
  },
  {
    id: 6,
    service: 'Car Repair',
    date: '10 Nov 2022',
    user: {
      name: 'Adrian',
      email: 'jadrian@gmail.com',
      avatar: '/images/avatar-adrian.jpg', // ADD YOUR IMAGE HERE
    },
    serviceImage: '/images/service-car-2.jpg', // ADD YOUR IMAGE HERE
  },
];

// 2. Main Page Component
export default function RecentBooking() {
  return (
    <>
      <Head>
        <title>Bookings List</title>
        <meta name="description" content="List of service bookings" />
      </Head>
      
      {/* Page container with a light gray background */}
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        
        {/* Content container with a max-width and centered */}
        <div className="max-w-4xl mx-auto">
        


          {/* List container */}
          <div className="space-y-4">
            {bookingsData.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

// 3. Reusable Booking Item Component
function BookingItem({ booking }) {
  const { service, date, user, serviceImage } = booking;

  return (
    // Card container:
    // - Mobile: 'flex flex-col' (stacks items vertically)
    // - Desktop: 'md:grid' (creates a 3-column grid)
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm flex flex-col md:grid md:grid-cols-[2fr_1.5fr_auto] md:items-center gap-4 md:gap-6">
      
      {/* --- 1. Service Info --- */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <Image
            src={serviceImage}
            alt={service}
            width={64} // w-16
            height={48} // h-12
            className="rounded-md object-cover w-16 h-12"
          />
        </div>
        {/* 'min-w-0' is a trick to allow text truncation to work inside flexbox */}
        <div className="min-w-0">
          <h6 className="font-bold text-gray-800 truncate">{service}</h6>
          <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
            <FiCalendar className="flex-shrink-0" />
            <span>{date}</span>
          </p>
        </div>
      </div>

      {/* --- 2. User Info --- */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Image
            src={user.avatar}
            alt={user.name}
            width={40} // w-10
            height={40} // h-10
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-700 truncate">{user.name}</p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
      </div>

      {/* --- 3. Action Button --- */}
      <button 
        className="
          bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg text-sm font-medium 
          hover:bg-gray-200 transition-colors
          focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50
          w-full md:w-auto md:justify-self-end
        "
      >
        Cancel
      </button>
    </div>
  );
}