'use client'; // Add this at the top of your file

import React, { useState } from 'react';
import Image from 'next/image';
import myImage from "@/assets/img/about-bg.png"; // Replace with your image path

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-6">
      {/* Header Section */}
      <h1 className="text-4xl font-semibold text-gray-900 mb-6 sm:mb-8 text-center">Why Choose Us</h1>
      <p className="text-lg text-gray-700 mb-6 sm:mb-12 text-center">
        Choose us for reliable, personalized service and exceptional results.
      </p>
      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column with FAQ */}
        <div className="space-y-6">
          {/* FAQ Item 1 */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3
              className="text-xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleAnswer(0)}
            >
              24/7 Supports
            </h3>
            {activeIndex === 0 && (
              <p className="text-gray-600">
                Access round-the-clock support through our dedicated helpdesk, available 24/7 to address any issues or queries you may have. Whether it's day or night, our team is here to ensure you receive timely assistance and seamless service.
              </p>
            )}
          </div>

          {/* FAQ Item 2 */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3
              className="text-xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleAnswer(1)}
            >
              Client’s Reviews
            </h3>
            {activeIndex === 1 && (
              <p className="text-gray-600">See what our clients are saying about our work and service.</p>
            )}
          </div>

          {/* FAQ Item 3 */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3
              className="text-xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleAnswer(2)}
            >
              Professional Team
            </h3>
            {activeIndex === 2 && (
              <p className="text-gray-600">Our team of experts is highly trained and ready to meet your needs.</p>
            )}
          </div>

          {/* FAQ Item 4 */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3
              className="text-xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => toggleAnswer(3)}
            >
              Best Services
            </h3>
            {activeIndex === 3 && (
              <p className="text-gray-600">We provide the best services in the industry, ensuring customer satisfaction.</p>
            )}
          </div>
        </div>

        {/* Right Column with Image */}
        <div className="relative h-64 sm:h-80 md:h-auto">
          <Image
            src={myImage}
            alt="Construction workers"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

