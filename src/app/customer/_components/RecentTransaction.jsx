import React from "react";
import {
  MdOutlineCloudDone,
  MdOutlineRefresh,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { LuCalendarDays, LuClock } from "react-icons/lu";

const transactions = [
  {
    type: "Service Booking",
    date: "22 Sep 2023",
    time: "10:12 AM",
    amount: "$280.00",
    icon: MdOutlineCloudDone,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    type: "Service Refund",
    date: "15 Oct 2022",
    time: "14:36 PM",
    amount: "$395.00",
    icon: MdOutlineRefresh,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    type: "Wallet Topup",
    date: "18 Oct 2022",
    time: "15:19 PM",
    amount: "$1000.00",
    icon: MdOutlineAccountBalanceWallet,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    type: "Service Booking",
    date: "28 Oct 2022",
    time: "11:17 AM",
    amount: "$598.65",
    icon: MdOutlineCloudDone,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    type: "Service Booking",
    date: "10 Nov 2022",
    time: "09:13 AM",
    amount: "$300.00",
    icon: MdOutlineCloudDone,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    type: "Service Booking",
    date: "10 Nov 2022",
    time: "09:13 AM",
    amount: "$300.00",
    icon: MdOutlineCloudDone,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
];

const RecentTransaction = () => {
  return (
    <div>
      <main className="  flex justify-center mt-5">
        <div className="w-full max-w-5xl bg-white border border-gray-200 rounded ">
          <div className="space-y-4">
            {transactions.map((transaction, index) => {
              const TransactionIcon = transaction.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between  p-3 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center space-x-4 md:flex-row flex-col">
                    {/* Icon */}
                    <div className={`p-2 rounded-full ${transaction.iconBg}`}>
                      <TransactionIcon
                        className={`h-5 w-5 ${transaction.iconColor}`}
                      />
                    </div>

                    {/* Transaction Details */}
                    <div>
                      <p className="text-base font-medium text-slate-800">
                        {transaction.type}
                      </p>
                      <div className="flex items-center text-[12px] font-medium text-gray-400 mt-0.5 space-x-2">
                        <LuCalendarDays className="h-3 w-3" />
                        <span>{transaction.date}</span>
                        <LuClock className="h-3 w-3 ml-2" />
                        <span>{transaction.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <p className="text-base font-semibold text-slate-800">
                    {transaction.amount}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecentTransaction;
