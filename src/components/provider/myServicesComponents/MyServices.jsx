"use client";

import {
  FaStar,
  FaMapMarkerAlt,
  FaEdit,
  FaClock,
  FaRegClock,
} from "react-icons/fa";

const MyServices = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          {/* Image Section */}
          <div className="relative">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
            />
            <span className="absolute top-2 left-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {item.category}
            </span>
            <div className="absolute top-2 right-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded flex items-center gap-1">
              <FaStar className="text-yellow-400 text-sm" />
              {item.rating}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h5 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h5>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-500 text-sm">
                <FaMapMarkerAlt className="mr-2" />
                {item.location}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-800">
                  {item.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {item.oldPrice}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex gap-3 text-gray-500">
                <button className="flex items-center gap-1 hover:text-[var(--primary)]">
                  <FaEdit /> Edit
                </button>
                <button className=" flex items-center gap-1  hover:text-[var(--primary)]">
                  <FaRegClock /> {item.status}
                </button>
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded">
                Apply Offer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyServices;
