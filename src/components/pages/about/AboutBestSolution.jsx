import React from 'react';
import Image from "next/image";
import BGAbout from "@/assets/img/about-bg.png";
const AboutBestSolution = () => {
    return (
        <div className=" bg-gray-50 ms-10 me-10 ">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="grid md:grid-cols-2 ">
          {/* Left Side: Image */}
          <div className="relative">
            <Image
              src={BGAbout} // Replace with the actual path to your image
              alt="Service image"
              width={500}
              height={600}
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute top-4 left-4 text-white text-lg bg-blue-800 px-4 py-2 rounded-lg">
              12+ years of experiences
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Best Solution For Cleaning Services
            </h2>
            <p className=" text-gray-700 mb-4">
              Welcome to Truelysell, your premier destination for connecting with top-rated service providers and finding the perfect match for your needs. Our platform is designed to simplify the process of discovering, evaluating, and hiring trusted professionals across a wide range of services, from home improvement and IT support to personal care and more.
            </p>
            <p className=" text-gray-700 mb-4">
              At Truelysell, our mission is to bridge the gap between service providers and customers by offering a seamless and efficient marketplace experience. We aim to empower both parties by providing a reliable platform where quality, transparency, and customer satisfaction are our top priorities.
            </p>

            <ul className="list-disc list-inside text-gray-700">
              <li>We prioritize quality and reliability</li>
              <li>Clear, detailed service listings & reviews</li>
              <li>Saves your time and effort</li>
              <li>Smooth and satisfactory experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
};

export default AboutBestSolution;