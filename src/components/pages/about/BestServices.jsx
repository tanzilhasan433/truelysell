import React from 'react';
import Image from "next/image";
const BestServices = () => {
    return (
        
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-6xl w-full flex items-center justify-between bg-[#0f172a] rounded-xl shadow-lg p-10">
        {/* Left Content */}
        <div className="text-white max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Looking for the Best Service Finder & Bookings
          </h1>
          <p className="mt-4 text-gray-300 text-sm md:text-base">
            We offer a comprehensive directory of top-rated service providers,
            detailed profiles, and customer reviews to help you make the best
            choice for your needs.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 px-5 py-2 bg-white text-gray-900 font-medium rounded-md shadow hover:bg-gray-200 transition">
            Get Started
            <span className="text-lg">↗</span>
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden md:block">
          <Image
            src="/worker.png" // place your screenshot/worker image in public/worker.png
            alt="Service Worker"
            width={350}
            height={350}
            className="rounded-lg"
          />
        </div>
      </div>
    </main>
    );
};

export default BestServices;