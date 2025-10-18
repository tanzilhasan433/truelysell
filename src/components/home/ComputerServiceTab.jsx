import Image from "next/image";
import React, { useRef } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import p1 from "@/assets/provider/provider1.jpg";
import p2 from "@/assets/provider/provider2.jpg";
import p3 from "@/assets/provider/provider3.jpg";
import p4 from "@/assets/provider/provider4.jpg";
import p5 from "@/assets/provider/provider5.jpg";

const services = [
  {
    title: "Backup & Recovery",
    image: p1,
    providerImg: "https://i.pravatar.cc/150?img=6",
    rating: 4.5,
    reviews: 250,
    price: 130,
  },
  {
    title: "Repairs & Upgrades",
    image: p2,
    providerImg: "https://i.pravatar.cc/150?img=1",
    rating: 4.2,
    reviews: 120,
    price: 150,
  },
  {
    title: "Setup & Configuration",
    image: p3,
    providerImg: "https://i.pravatar.cc/150?img=2",
    rating: 4.4,
    reviews: 300,
    price: 200,
  },
  {
    title: "Troubleshooting & Diagnostics",
    image: p4,
    providerImg: "https://i.pravatar.cc/150?img=3",
    rating: 4.7,
    reviews: 280,
    price: 250,
  },
  {
    title: "Server Management",
    image: p5,
    providerImg: "https://i.pravatar.cc/150?img=4",
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
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100"
      >
        <GoArrowLeft size={20} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100"
      >
        <GoArrowRight size={20} />
      </button>

      {/* Cards Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-4 "
      >
        {services.map((s, i) => (
          <div
            key={i}
            className="min-w-[280px] bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="relative">
              <Image
                src={s.image}
                alt={s.title}
                className="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
              <div className="w-7 h-7  absolute top-2 left-2">
                <Image
                  src={s.providerImg}
                  alt={""}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              <button className="absolute top-2 right-2 hover:bg-[var(--primary)] hover:text-white text-gray-600 bg-white  p-1 w-7 h-7 rounded-full flex items-center justify-center gap-1">
                <FaRegHeart className=" text-sm" />
              </button>
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
