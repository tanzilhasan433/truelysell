"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const revenueData = [
  { name: "may", revenue: 40, revenue2: 35 },
  { name: "june", revenue: 100, revenue2: 60 },
  { name: "july", revenue: 98, revenue2: 40 },
];

const bookingData = [
  { name: "Jan", value: 80 },
  { name: "Feb", value: 150 },
  { name: "Mar", value: 90 },
  { name: "Apr", value: 180 },
  { name: "May", value: 150 },
  { name: "Jun", value: 180 },
  { name: "Jul", value: 200 },
  { name: "Aug", value: 60 },
  { name: "Sep", value: 200 },
  { name: "Oct", value: 130 },
  { name: "Nov", value: 160 },
  { name: "Dec", value: 50 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {/* Revenue Chart */}
      <div className="bg-white shadow rounded-xl p-4 border border-gray-200/80">
        <div className="flex justify-between items-center mb-5">
          <h6 className="text-gray-700 font-medium">Revenue</h6>
          <button className="text-sm text-gray-500 flex items-center gap-1">
            Monthly <span>▼</span>
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue2"
                stroke="#3B82F6"
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeDasharray="5 5"
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-white shadow rounded-xl p-4 border border-gray-200/80">
        <div className="flex justify-between items-center mb-5">
          <h6 className="text-gray-700 font-medium">Booking Summary</h6>
          <button className="text-sm text-gray-500 flex items-center gap-1">
            Monthly <span>▼</span>
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
