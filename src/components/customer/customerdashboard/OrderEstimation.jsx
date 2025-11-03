import React from "react";
import { BsCart } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { FaGem, FaPiggyBank } from "react-icons/fa";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";

// Data for the dashboard cards
const stats = [
  {
    title: "Total Orders",
    value: "27",
    icon: BsCart, // react-icon component
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
    change: "16%",
    changeType: "increase",
  },
  {
    title: "Total Spend",
    value: "$ 2500",
    icon: IoWalletOutline, // react-icon component
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
    change: "5%",
    changeType: "decrease",
  },
  {
    title: "Wallet",
    value: "$ 200",
    icon: FaGem, // react-icon component
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    change: "5%",
    changeType: "decrease",
  },
  {
    title: "Total Savings",
    value: "$ 354",
    icon: FaPiggyBank, // react-icon component
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    change: "16%",
    changeType: "increase",
  },
];

const OrderEstimation = () => {
  return (
    <div>
      <main className="mt-5 mb-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
          {stats.map((stat) => {
            const IconComponent = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl shadow border border-gray-200/20 p-3 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${stat.iconBg}`}>
                      <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
                    </div>
                    <div className="">
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>
                      <p className="text-xl font-bold text-slate-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold
                    ${
                      stat.changeType === "increase"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                    >
                      {stat.changeType === "increase" ? (
                        <IoMdTrendingUp className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <IoMdTrendingDown className="h-3.5 w-3.5 mr-1" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default OrderEstimation;
