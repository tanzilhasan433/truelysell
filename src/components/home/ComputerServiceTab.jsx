import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaRegHeart, FaStar } from "react-icons/fa";

const services = [
  {
    title: "Repairs & Upgrades",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    rating: 4.2,
    reviews: 120,
    price: 150,
  },
  {
    title: "Setup & Configuration",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?2",
    rating: 4.4,
    reviews: 300,
    price: 200,
  },
  {
    title: "Troubleshooting & Diagnostics",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6c3f4c14",
    rating: 4.7,
    reviews: 280,
    price: 250,
  },
  {
    title: "Server Management",
    image: "https://images.unsplash.com/photo-1581092334434-c4c71b4f15b3",
    rating: 4.5,
    reviews: 260,
    price: 350,
  },
];

export default function ComputerServiceTab() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <FaArrowRight />
      </button>

      {/* Cards Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-4 px-10"
      >
        {services.map((s, i) => (
          <div
            key={i}
            className="min-w-[270px] bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="relative">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
              <span className="absolute top-2 left-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                p
              </span>
              <div className="absolute top-2 right-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                <FaRegHeart className="text-yellow-400 text-sm" />
              </div>
            </div>

            <div className="px-3 py-4">
              <p className="font-semibold text-start text-gray-800 mb-1">
                {s.title}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>
                    {s.rating} ({s.reviews} Reviews)
                  </span>
                </div>
                <p className="text-sm text-gray-600">From ${s.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
