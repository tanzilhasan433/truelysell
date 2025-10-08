"use client";

import Image from "next/image";
import { FaSearch, FaStar } from "react-icons/fa";
import bannerBg from "@/assets/img/bg/banner-bg.png";
import bannerPerson from "@/assets/img/banner.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";

export default function HomeHeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(249,243,255,1) 35%, rgba(241,247,255,1) 100%)",
      }}
    >
      {/* Soft background shapes */}
      <div
        className="absolute -left-40 -bottom-40 w-60 h-80 rounded-full opacity-80 blur-2xl z-0"
        style={{ background: "radial-gradient(circle, #d1b3ff, #e0ccff)" }}
        // style={{ background: "radial-gradient(circle, #efe6ff, #f9f5ff)" }}
      />
      <div
        className="absolute -right-28 -top-14 w-80 h-80 rounded-full opacity-60 blur-2xl z-0"
        style={{ background: "radial-gradient(circle, #ffeef6, #fff3fb)" }}
      />

      <div className="relative z-20 container mx-auto  lg:ps-16">
        <div className="grid grid-cols-1 lg:grid-cols-12  gap-8 ">
          {/* LEFT SIDE */}
          <div className="lg:col-span-7 py-16">
            <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Connect with Nearby Top-rated{" "}
              <span className="block">
                Professional{" "}
                <span className=" relative w-fit">
                  <TypeAnimation
                    className="text-gradient mt-2"
                    sequence={[
                      "Stylist",
                      1000,
                      "Carpenders",
                      1000,
                      "Builders",
                      1000,
                    ]}
                    speed={50}
                    repeat={Infinity}
                  />
                  <span className="absolute bottom-0 left-0 w-full h-[5px] bg-pink-500 rounded-full"></span>
                </span>
              </span>
            </h3>

            <p className="text-gray-500 mb-8 text-sm font-medium max-w-xl">
              We can connect you to the right Service, first time and every
              time.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-center gap-3 border border-gray-200 bg-white/90  rounded-md px-2 py-1 w-full max-w-xl">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 w-full">
                  <FaSearch className="text-gray-400 text-xs" />
                  <input
                    className="w-full outline-none bg-transparent text-sm text-gray-700 placeholder:text-xs font-medium"
                    placeholder="Search for Service"
                  />
                </div>

                <div className="hidden md:block w-px h-10 bg-gray-200" />
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 w-72">
                  <HiOutlineLocationMarker className="text-gray-400 " />
                  <input
                    className="w-full outline-none bg-transparent text-sm text-gray-700 placeholder:text-xs font-medium"
                    placeholder="Enter Location"
                  />
                </div>
              </div>

              <button
                className="flex items-center gap-1 px-4 py-2 rounded text-white font-medium text-sm 
                 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-blue)] 
                 hover:opacity-90 transition-all duration-200  hover:text-[var(--primary)]"
              >
                <FaSearch />
                Search
              </button>
            </div>

            {/* Popular Searches */}
            <div className="mt-6 flex items-center flex-wrap gap-1 text-sm">
              <span className="text-gray-800 font-medium mr-3">
                Popular Searches
              </span>
              {["Plumber", "Interior", "Nail Technicians"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 text-xs hover:text-white hover:bg-[var(--primary)]"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-12 text-gray-700">
              <div>
                <p className="font-bold ">215,292 +</p>
                <p className="text-xs text-gray-500">Verified Providers</p>
              </div>
              <div>
                <p className="font-bold ">90,000 +</p>
                <p className="text-xs text-gray-500">Services Completed</p>
              </div>
              <div>
                <p className="font-bold ">2,390,968</p>
                <p className="text-xs text-gray-500">Reviews Globally</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-5 relative ">
            <div className="absolute lg:-left-28 top-20 bg-white rounded-lg shadow px-3 py-2 flex items-center gap-2 text-sm z-30 animate-leftRightBounce">
              <FaStar className="bg-yellow-500 text-white w-7 h-7 p-2 rounded-full " />
              <div>
                <p className="font-medium text-gray-400 text-xs">4.9 / 5</p>
                <p className="text-gray-400 text-xs">(255 reviews)</p>
              </div>
            </div>

            <div className="absolute right-6 top-8 bg-white rounded shadow px-2 py-1 text-xs font-medium z-30 text-gray-600 flex items-center gap-1 animate-leftRightBounce ">
              <BsFillPatchCheckFill className="text-green-600 " /> 300 Booking
              Completed
            </div>

            <div className="absolute bottom-0 right-0 lg:w-[600px]  z-10 ">
              <Image
                src={bannerBg}
                alt="Banner Background"
                className="w-full h-full object-contain"
                priority
              />
            </div>
            {/* Person Image (above banner-bg) */}
            <div className="absolute z-20 lg:w-[600px]  bottom-0  lg:-ms-14 animate-slow-bounce ">
              <Image
                src={bannerPerson}
                alt="Professional Workers"
                className="w-full h-auto object-contain "
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
