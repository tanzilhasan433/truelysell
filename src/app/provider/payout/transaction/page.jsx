"use client";

import { transactionData } from "@/data/json/payout";

import { GoDotFill } from "react-icons/go";

const ProviderTransactionPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Transaction</h4>
      </div>
      {/* payout cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"></div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full  text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">Transaction ID</th>
              <th className="py-5 px-3">Customer Name</th>
              <th className="py-5 px-3">Service</th>
              <th className="py-5 px-3">Date</th>
              <th className="py-5 px-3">Payout method</th>
              <th className="py-5 px-3">Amount </th>
              <th className="py-5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {transactionData.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.transactionId}</td>
                <td className="py-4 px-3">{item.customerName}</td>
                <td className="py-4 px-3">{item.service}</td>
                <td className="py-4 px-3">{item.date}</td>
                <td className="py-4 px-3">{item.paymentMethod}</td>
                <td className="py-4 px-3">{item.amount}</td>

                <td className="py-4 px-3">
                  <button
                    className={`${
                      item.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Pending"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } text-[11px] font-medium px-2.5 py-0.5 rounded flex items-center gap-1`}
                  >
                    <GoDotFill /> {item.status}
                  </button>
                </td>
                <td className="py-4 px-3">{item.paymentProcessed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderTransactionPage;
