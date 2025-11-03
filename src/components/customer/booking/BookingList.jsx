import { useState } from 'react';

const BookingList = () => {
    const bookings = [
    {
      id: 1,
      title: "Computer Services",
      status: "Cancelled",
      date: "27 Sep 2022, 17:00-18:00",
      amount: "$100.00",
      location: "New York, USA",
      provider: "John Doe",
      providerInfo: {
        email: "info@johndoe.com",
        phone: "+1 888 888 8888"
      }
    },
    {
      id: 2,
      title: "Car Repair Services",
      status: "Completed",
      date: "23 Sep 2022, 10:00-11:00",
      amount: "$50.00",
      location: "Alabama, USA",
      provider: "John Smith",
      providerInfo: {
        email: "info@johnsmith.com",
        phone: "+1 607-276-5393"
      }
    },
    {
      id: 3,
      title: "Interior Designing",
      status: "Inprogress",
      date: "22 Sep 2022, 11:00-12:00",
      amount: "$50.00",
      location: "Washington, DC, USA",
      provider: "Quentin",
      providerInfo: {
        email: "info@quentin.com",
        phone: "+1 601-810-9218"
      }
    }
  ];
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h6 className="text-xl font-semibold">{booking.title}</h6>
            <span
              className={`px-3 py-1 text-white rounded-full text-sm ${statusClasses(booking.status)}`}
            >
              {booking.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm">Booking Date : {booking.date}</p>         
          <p className="text-sm font-semibold">Amount : {booking.amount}</p>
            <p className="text-gray-600 text-sm">Location : {booking.location}</p>

          <div className="mt-4 flex space-x-4">
            <button
              className="text-blue-500 hover:text-blue-700 text-sm"
              onClick={() => alert('Reschedule booking')}
            >
              Reschedule
            </button>
            <button
              className="text-green-500 hover:text-green-700 text-sm"
              onClick={() => alert('Rebook booking')}
            >
              Rebook
            </button>
            <button
              className="text-gray-500 hover:text-gray-700 text-sm"
              onClick={() => alert('Add Review')}
            >
              Add Review
            </button>
            {booking.status === 'Completed' && (
              <div className="flex items-center">
                <span className="text-yellow-500 text-sm">⭐⭐⭐⭐</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <img
                className="w-8 h-8 rounded-full"
                src={`https://api.hello-avatar.com/adorables/40/${booking.provider}.png`}
                alt={booking.provider}
              />
              <div>
                <p className="font-semibold">{booking.provider}</p>
                <p className="text-sm text-gray-500">{booking.providerInfo.email}</p>
                <p className="text-sm text-gray-500">{booking.providerInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const statusClasses = (status) => {
  switch (status) {
    case 'Cancelled':
      return 'bg-red-500';
    case 'Completed':
      return 'bg-green-500';
    case 'Inprogress':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

export default BookingList;
