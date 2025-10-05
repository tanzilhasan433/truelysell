"use client";

import { BookingsData } from "@/data/json/bookingsData";
import React from "react";
// update path as needed
import { FaStar, FaRegCommentDots } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin, FiHeart } from "react-icons/fi";

const BookingListComponent = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      case "Inprogress":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <div className="space-y-5 my-5">
      {BookingsData.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-5"
        >
          {/* Left Image */}
          <div className="relative w-full sm:w-1/4">
            <img
              src={item.img}
              alt={item.service}
              className="w-full h-40 object-cover rounded-md"
            />
            <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
              <FiHeart className="text-gray-600" />
            </button>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{item.service}</h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded ${getStatusColor(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Booking Date:</span>{" "}
              {item.bookingDate}
            </p>

            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Amount:</span>{" "}
              {item.amount}{" "}
              <span className="text-pink-500 font-semibold">
                {item.payment}
              </span>
            </p>

            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FiMapPin className="text-gray-400" />
              {item.location}
            </p>

            {/* Provider Info */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <img
                src={item.provider.img}
                alt={item.provider.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.provider.name}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <FiMail /> {item.provider.email}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <FiPhone /> {item.provider.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex flex-col justify-between sm:items-end gap-3 sm:w-32">
            <div className="flex flex-wrap gap-2">
              {item.actions.includes("Rebook") && (
                <button className="bg-black text-white px-4 py-1.5 rounded-md text-sm">
                  Rebook
                </button>
              )}
              {item.actions.includes("Reschedule") && (
                <button className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-md text-sm">
                  Reschedule
                </button>
              )}
              {item.actions.includes("Chat") && (
                <button className="bg-black text-white px-4 py-1.5 rounded-md text-sm flex items-center gap-1">
                  <FaRegCommentDots /> Chat
                </button>
              )}
              {item.actions.includes("Cancel") && (
                <button className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-md text-sm">
                  Cancel
                </button>
              )}
            </div>

            {item.actions.includes("Add Review") && (
              <div className="text-right">
                <button className="text-gray-700 text-sm flex items-center gap-1">
                  Add Review
                </button>
                <div className="flex justify-end text-yellow-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <button className="text-pink-500 text-sm mt-1">
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingListComponent;
