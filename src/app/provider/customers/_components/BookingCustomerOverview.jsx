"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import StatCard from "./StatCard";

const BookingCustomerOverview = ({ overview }) => {
  const chartData = [
    {
      name: "Pending",
      value: overview?.pendingBooking || 0,
      color: "#3B82F6",
    },
    {
      name: "Accepted",
      value: overview?.acceptedBooking || 0,
      color: "#22C55E",
    },
    {
      name: "Ongoing",
      value: overview?.ongoingBooking || 0,
      color: "#F59E0B",
    },
    {
      name: "Completed",
      value: overview?.completedBooking || 0,
      color: "#10B981",
    },
    {
      name: "Canceled",
      value: overview?.canceledBooking || 0,
      color: "#8B5CF6",
    },
  ];

  const totalBookings = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-8">
      <div className="flex  lg:flex-row flex-col w-full gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:w-[65%]">
          <StatCard
            title="Total Booking Placed"
            value={overview?.totalBookingPlaced}
            border="border-blue-200"
            text="text-blue-600"
          />
          <StatCard
            title="Wallet Balance"
            value={`৳${overview?.walletBalance || 0}`}
            border="border-orange-200"
            text="text-orange-500"
          />
          <StatCard
            title="Total Booking Amount"
            value={`৳${overview?.totalBookingAmount || 0}`}
            border="border-green-200"
            text="text-green-600"
          />
          <StatCard
            title="Loyalty Point"
            value={overview?.loyaltyPoint || 0}
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
              <p className="text-xs text-gray-500"> {totalBookings} Bookings</p>
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
    </div>
  );
};

export default BookingCustomerOverview;
