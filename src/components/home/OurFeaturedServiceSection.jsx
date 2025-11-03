"use client";
import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";
import React, { useRef } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import f1 from "@/assets/featured/featured1.jpg";
import f2 from "@/assets/featured/featured2.jpg";
import f3 from "@/assets/featured/featured3.jpg";
import f4 from "@/assets/featured/featured4.jpg";
import f5 from "@/assets/featured/featured5.jpg";
import Image from "next/image";

const featuredServices = [
  {
    title: "Professional Delivery Services",
    image: f1,
    rating: 4.5,
    price: 40,
  },
  {
    title: "Classic Manicure & Set of Nails",
    image: f2,
    rating: 4.4,
    price: 20,
  },
  {
    title: "Water Heater Installation",
    image: f3,
    rating: 4.2,
    price: 65,
  },
  {
    title: "General House & Carpet Clean",
    image: f4,
    rating: 4.7,
    price: 95,
  },
  {
    title: "Custom PC Builds",
    image: f5,
    rating: 4.8,
    price: 85,
  },
];

const OurFeaturedServiceSection = () => {
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
    <div className="py-16 bg-gray-100 text-center">
      <TitleWithSubTitle
        heading="Our Featured"
        headingClr=" Services"
        subTitle=" Each listing is designed to be clear and concise, providing customers"
      />
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
          {featuredServices.map((s, i) => (
            <div
              key={i}
              className="min-w-[375px]  bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <Image
                  src={s.image}
                  alt={s.title}
                  width={1000}
                  height={1000}
                  className="w-full h-80 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
                />

                <button className="absolute top-2 right-2 hover:bg-[var(--primary)] hover:text-white text-gray-600 bg-white  p-1 w-7 h-7 rounded-full flex items-center justify-center gap-1">
                  <FaRegHeart className=" text-sm" />
                </button>
              </div>

              <div className="px-3 py-4">
                <p className="font-semibold text-start text-gray-800 mb-1 hover:underline hover:text-[var(--primary)]">
                  {s.title}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Service start at ${s.price}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{s.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ViewAllButton pageLink="/" />
    </div>
  );
};

export default OurFeaturedServiceSection;
