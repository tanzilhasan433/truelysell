"use client";
import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";
import React, { useRef } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import f1 from "@/assets/preferred/preferred1.jpg";
import f2 from "@/assets/preferred/preferred2.jpg";
import f3 from "@/assets/preferred/preferred3.jpg";
import f4 from "@/assets/preferred/preferred4.jpg";
import f5 from "@/assets/preferred/preferred5.jpg";
import Image from "next/image";

const preferredServices = [
  {
    title: "Cabinet Installation",
    image: f1,
    rating: 4.5,
    price: 350,
    reviews: 250,
    providerImg: "https://i.pravatar.cc/150?img=1",
    name: "Traiavala Andverson",
    booking: "3K",
  },
  {
    title: "Express Car Wash",
    image: f2,
    rating: 4.4,
    price: 200,
    reviews: 270,
    providerImg: "https://i.pravatar.cc/150?img=2",
    name: "William Tichenor",
    booking: "2K",
  },
  {
    title: "Haircut Styling",
    image: f3,
    rating: 4.2,
    price: 65,
    reviews: 280,
    providerImg: "https://i.pravatar.cc/150?img=3",
    name: "Edwin Murphy",
    booking: "2K",
  },
  {
    title: "Roofing Services",
    image: f4,
    rating: 4.7,
    price: 400,
    reviews: 360,
    providerImg: "https://i.pravatar.cc/150?img=4",
    name: "Wasley McClure",
    booking: "4K",
  },
  {
    title: "Pure Home Cleaning",
    image: f5,
    rating: 4.8,
    price: 180,
    reviews: 260,
    providerImg: "https://i.pravatar.cc/150?img=5",
    name: "James Reese",
    booking: "1K",
  },
];

const MostPreferredServiceSection = () => {
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
    <div className="py-16  text-center">
      <TitleWithSubTitle
        heading="Most "
        headingClr=" Preferred Services"
        subTitle="Each listing is designed to be clear and concise, providing customers"
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
          {preferredServices.map((s, i) => (
            <div
              key={i}
              className="min-w-[375px]  bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <Image
                  src={s.image}
                  alt={s.title}
                  width={1500}
                  height={1500}
                  className="w-full h-80 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
                />

                <button className="absolute top-2 right-2 hover:bg-[var(--primary)] hover:text-white text-gray-600 bg-white  p-1 w-7 h-7 rounded-full flex items-center justify-center gap-1">
                  <FaRegHeart className=" text-sm" />
                </button>
              </div>

              <div className="px-3 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden mb-3">
                      <Image
                        src={s.providerImg}
                        alt={s.name}
                        width={50}
                        height={50}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="text-sm text-gray-500">{s.name}</p>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>From ${s.price}</span>
                  </div>
                </div>
                <p className="font-semibold text-start text-gray-800 mb-1 hover:underline hover:text-[var(--primary)]">
                  {s.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center ">
                    <FaStar className="text-yellow-400 mr-1" />
                    <p className="text-sm text-gray-500">
                      {s.rating} ({s.reviews} Reviews)
                    </p>
                  </div>
                  <div className="  mb-2">
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                      {s.booking} Bookings
                    </span>
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

export default MostPreferredServiceSection;
