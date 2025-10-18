"use client";
import React from "react";
import Image from "next/image";
import r1 from "@/assets/removal/removal1.jpg";
import r2 from "@/assets/removal/removal2.jpg";
import r3 from "@/assets/removal/removal3.jpg";
import r4 from "@/assets/removal/removal4.jpg";

const services = [
  {
    title: "Laser Tattoo Removal",
    img: r1,
  },
  {
    title: "Surgical Excision",
    img: r2,
  },
  {
    title: "Saline Tattoo Removal",
    img: r3,
  },
  {
    title: "Tattoo Removal Creams",
    img: r4,
  },
];

const RemovalService = () => {
  return (
    <div className="max-w-6xl mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition"
          >
            <Image
              src={service.img}
              alt={service.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 text-white  bg-opacity-50 p-3">
              <p className="text-white text-lg font-semibold">
                {service.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemovalService;
