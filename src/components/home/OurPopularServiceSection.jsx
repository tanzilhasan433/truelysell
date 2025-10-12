"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";
import ComputerServiceTab from "./ComputerServiceTab";

const tabs = [
  { name: "Computer Service", component: <ComputerServiceTab /> },
  { name: "Removals", component: <ComputerServiceTab /> },
  { name: "Plumbing", component: <ComputerServiceTab /> },
];

const OurPopularServiceSection = () => {
  const [activeTab, setActiveTab] = useState("Computer Service");
  return (
    <div className="py-16  text-center">
      <TitleWithSubTitle
        heading="Our Popular "
        headingClr=" Services"
        subTitle="Each listing is designed to be clear and concise, providing customers"
      />
      <div className="w-full px-6 py-8">
        {/* Tabs Header */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-5 py-2 rounded-md font-medium transition-all
              ${
                activeTab === tab.name
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {tabs.find((t) => t.name === activeTab)?.component}
        </div>
      </div>

      <ViewAllButton pageLink="/" />
    </div>
  );
};

export default OurPopularServiceSection;
