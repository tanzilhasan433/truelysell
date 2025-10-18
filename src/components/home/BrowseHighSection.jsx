"use client";
import { useState } from "react";
import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";
import RemovalService from "./RemovalService";

const tabs = [
  { name: "Removals", component: <RemovalService /> },
  { name: "Furniture Assembly", component: <RemovalService /> },
  { name: "Electrical Services", component: <RemovalService /> },
  { name: "Construction", component: <RemovalService /> },
  { name: "Man & Van", component: <RemovalService /> },
  { name: "Plumbing", component: <RemovalService /> },
  { name: "More Services", component: <RemovalService /> },
];

const BrowseHighSection = () => {
  const [activeTab, setActiveTab] = useState("Removals");
  return (
    <div className="py-16  text-center">
      <TitleWithSubTitle
        heading="Browse "
        headingClr=" High Rated Services"
        subTitle="Each listing is designed to be clear and concise, providing customers"
      />
      <div className="w-full  ">
        {/* Tabs Header */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tabs.map((tab, inx) => (
            <button
              key={inx}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-1.5 rounded font-medium transition-all
              ${
                activeTab === tab.name
                  ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-blue)] text-white"
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

export default BrowseHighSection;
