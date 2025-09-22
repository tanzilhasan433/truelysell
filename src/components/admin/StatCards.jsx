"use client";

import { BsArrowUp } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiBriefcaseAlt2, BiCreditCardAlt } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { LineChart, Line, ResponsiveContainer } from "recharts";
const StatCard = ({
  title,
  value,
  icon,
  color,
  lineColor,
  data,
  trendColor,
}) => {
  return (
    <div className="bg-white border-2 border-gray-200/80 rounded-xl p-4 flex flex-col justify-between w-full max-w-[250px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-lg ${color} `}
        >
          {icon}
        </div>
        <button className=" font-semibold">⋮</button>
      </div>

      {/* Value */}
      <div className="mt-3 flex items-center ">
        <div className="lg:w-[60%]">
          <div className="flex items-center space-x-2">
            <span>
              <BsArrowUp />
            </span>
            <p className=" text-2xl font-medium">{value}</p>
          </div>
          <p className="text-xs text-gray-500">Current Month</p>
        </div>
        <div className="h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={lineColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCards = () => {
  const userData = [
    { value: 25 },

    { value: 18 },
    { value: 24 },
    { value: 10 },
    { value: 28 },
    { value: 32 },
    { value: 45 },
    { value: 50 },
    { value: 32 },
    { value: 55 },
    { value: 40 },
    { value: 60 },
    { value: 70 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
      <StatCard
        title="User"
        value={30}
        icon={<GoPerson className="text-blue-800 text-xl" />}
        color="bg-blue-100 "
        trendColor="text-blue-600"
        lineColor="#4F46E5"
        data={userData}
      />
      <StatCard
        title="Providers"
        value={25}
        icon={<IoPersonCircleOutline className="text-xl" />}
        color="bg-red-100 text-red-400"
        trendColor="text-red-600"
        lineColor="#DC2626"
        data={userData}
      />
      <StatCard
        title="Service"
        value={18}
        icon={<BiBriefcaseAlt2 className="text-xl" />}
        color="bg-indigo-100 text-indigo-600"
        trendColor="text-indigo-600"
        lineColor="#6366F1"
        data={userData}
      />
      <StatCard
        title="Subscription"
        value={650}
        icon={<BiCreditCardAlt className="text-xl" />}
        color="bg-yellow-100 text-yellow-600"
        trendColor="text-yellow-600"
        lineColor="#F59E0B"
        data={userData}
      />
    </div>
  );
};

export default StatCards;
