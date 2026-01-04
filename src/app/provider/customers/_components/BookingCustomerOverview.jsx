"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiEdit2, FiMail, FiPhone } from "react-icons/fi";
import { useAppContext } from "@/context/AppContext";

const chartData = [
  { name: "Pending", value: 0, color: "#3B82F6" },
  { name: "Accepted", value: 0, color: "#22C55E" },
  { name: "Ongoing", value: 0, color: "#F59E0B" },
  { name: "Completed", value: 1, color: "#EF4444" },
  { name: "Canceled", value: 0, color: "#8B5CF6" },
];

const StatCard = ({ title, value, border, text }) => (
  <div
    className={`relative overflow-hidden rounded-xl border ${border} bg-white p-2 `}
  >
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`mt-2 text-2xl font-semibold ${text}`}>{value}</p>

    {/* Curved background */}
    <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-gray-100 translate-x-1/3 translate-y-1/3" />
  </div>
);

const BookingCustomerOverview = () => {
  const { setSelectedId, setIsModalOpen } = useAppContext();
  const item = {
    id: "1",
    name: "Fatima",
    email: " fatimaakter874874@gmail.com",
    phone: "+8801712345678",
  };
  return (
    <div className="space-y-8">
      <div className="flex  lg:flex-row flex-col w-full gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:w-[65%]">
          <StatCard
            title="Total Booking Placed"
            value="1"
            border="border-blue-200"
            text="text-blue-600"
          />
          <StatCard
            title="Wallet Balance"
            value="৳0.00"
            border="border-orange-200"
            text="text-orange-500"
          />
          <StatCard
            title="Total Booking Amount"
            value="৳250.00"
            border="border-green-200"
            text="text-green-600"
          />
          <StatCard
            title="Loyalty Point"
            value="2.5"
            border="border-red-200"
            text="text-red-500"
          />
        </div>
        <div className="border border-gray-200 rounded-xl bg-white p-5 flex flex-col justify-between lg:w-[30%]">
          <h5 className="text-sm font-medium text-center mb-4">
            Booking Overview
          </h5>

          <div className="relative h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={35}
                  outerRadius={55}
                >
                  {chartData.map((item, index) => (
                    <Cell key={index} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs text-gray-500">1 Bookings</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PERSONAL DETAILS */}
      <div className="border border-gray-200 rounded-xl bg-white p-6 mb-6">
        <h4 className=" font-semibold mb-4">Personal Details</h4>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
              F
            </div>

            <div>
              <p className="font-semibold text-gray-800">{item.name}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FiPhone />
                {item.phone}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FiMail />
                {item.email}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedId(item.id);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 darkButton "
          >
            <FiEdit2 />
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCustomerOverview;
