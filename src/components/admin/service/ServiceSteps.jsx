"use client";

import { useState } from "react";
import { FiClock, FiMap } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { BiLineChart } from "react-icons/bi";

const tabs = [
  { name: "Information", icon: <IoIosCheckmarkCircleOutline size={20} /> },
  { name: "Availability", icon: <FiClock size={20} /> },
  { name: "Location", icon: <FiMap size={20} /> },
  { name: "Gallery", icon: <GrGallery size={20} /> },
  { name: "SEO", icon: <BiLineChart size={20} /> },
];
const ServiceSteps = () => {
  const [activeTab, setActiveTab] = useState("Information");
  return (
    <div className="w-full bg-white">
      {/* NOTE: overflow-visible is important so triangles are not clipped */}
      <div className="grid lg:grid-cols-5 md:grid-cols-2 border border-gray-200/80 rounded-md overflow-visible">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative border-r border-gray-200/80 flex flex-col items-center justify-center py-3 transition-all duration-200
                ${
                  isActive
                    ? "bg-[var(--primary-blue)] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }
                ${idx === 0 ? "rounded-l-md" : ""}
                ${idx === tabs.length - 1 ? "rounded-r-md" : ""}`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                  isActive
                    ? "bg-white text-[var(--primary-blue)]"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.icon}
              </div>

              <span className="text-sm font-medium">{tab.name}</span>

              {/* Triangle / ribbon pointer */}
              {isActive && (
                <>
                  {idx === 0 ? (
                    // ribbon/triangle slightly shifted to the left for the first tab
                    <span
                      className={`hidden lg:block`}
                      style={{
                        position: "absolute",
                        bottom: "-10px",
                        left: "90px",
                        width: 0,
                        height: 0,
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderTop: "10px solid var(--primary-blue, #4C40ED)",
                        zIndex: 20,
                      }}
                    />
                  ) : (
                    // centered triangle for other tabs
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "8px solid var(--primary-blue, #4C40ED)",
                        zIndex: 20,
                      }}
                    />
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSteps;
