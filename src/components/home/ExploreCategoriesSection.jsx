"use client";

import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import cat1 from "@/assets/img/icons/category-01.svg";
import cat2 from "@/assets/img/icons/category-02.svg";
import cat3 from "@/assets/img/icons/category-03.svg";
import cat4 from "@/assets/img/icons/category-04.svg";
import cat5 from "@/assets/img/icons/category-05.svg";
import cat6 from "@/assets/img/icons/category-06.svg";
import cat7 from "@/assets/img/icons/category-07.svg";
import cat8 from "@/assets/img/icons/category-08.svg";
import cat9 from "@/assets/img/icons/category-09.svg";
import cat10 from "@/assets/img/icons/category-10.svg";
import cat11 from "@/assets/img/icons/category-11.svg";
import cat12 from "@/assets/img/icons/category-12.svg";
import Image from "next/image";
import ViewAllButton from "../shared/ViewAllButton";

const categories = [
  {
    id: 1,
    title: "Construction",
    listings: "9874 Listings",
    img: cat1,
  },
  {
    id: 2,
    title: "Removals",
    listings: "2357 Listings",
    img: cat2,
  },
  {
    id: 3,
    title: "Cleaning",
    listings: "2357 Listings",
    img: cat3,
  },
  {
    id: 4,
    title: "Computer Service",
    listings: "1260 Listings",
    img: cat4,
  },
  {
    id: 5,
    title: "Electrical",
    listings: "4546 Listings",
    img: cat5,
  },
  {
    id: 6,
    title: "Man & Van",
    listings: "2546 Listings",
    img: cat6,
  },
  {
    id: 7,
    title: "Deliveries",
    listings: "4547 Listings",
    img: cat7,
  },
  {
    id: 8,
    title: "Mobile Barber",
    listings: "4787 Listings",
    isNew: true,
    img: cat8,
  },
  {
    id: 9,
    title: "Interior",
    listings: "1457 Listings",
    img: cat9,
  },
  {
    id: 10,
    title: "Plumbing",
    listings: "4157 Listings",
    img: cat10,
  },
  {
    id: 11,
    title: "Nail Technicians",
    listings: "5477 Listings",
    img: cat11,
  },
  {
    id: 12,
    title: "Hair Dressers",
    listings: "7457 Listings",
    img: cat12,
  },
];

export default function ExploreCategoriesSection() {
  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <TitleWithSubTitle
          heading="Explore our"
          headingClr=" Categories"
          subTitle=" Service categories help organize and structure the offerings on a marketplace, making it easier for users to find what they need."
        />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative border border-gray-200/70 rounded-lg py-4 px-2 flex flex-col items-center text-center transition-all duration-300 hover:border hover:border-[var(--primary)]  hover:shadow-[0px_0px_15px_rgba(0,0,0,0.1)] shadow cursor-pointer"
            >
              <div
                className="absolute top-2 left-24 -translate-x-1/2 w-full h-14   blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-0"
                style={{
                  background: "radial-gradient(circle, #d1b3ff, #e0ccff)",
                }}
              />
              <div>
                <Image src={cat.img} alt=" " />
              </div>

              <p className="font-semibold text-gray-700 mb-1 text-sm ">
                {cat.title}
              </p>
              <p className="text-xs text-gray-500 group-hover:hidden">
                {cat.listings}
              </p>

              {/* New badge */}
              {cat.isNew && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  New
                </span>
              )}

              {/* View All Link (Visible on Hover) */}
              <Link
                href="#"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[var(--primary)] text-xs underline  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                View All
              </Link>
            </div>
          ))}
        </div>

        {/* Button */}
        <ViewAllButton pageLink="/" />
      </div>
    </section>
  );
}
