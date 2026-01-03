import React from "react";
import { GoDotFill } from "react-icons/go";
import { payout } from "@/data/json/payout";

const PayoutRequestTable = () => {
  return (
    <div className="overflow-x-auto mb-10">
      <table className="max-w-7xl w-full  text-sm text-left text-gray-600">
        <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
          <tr>
            <th className="py-5 px-3">Payout Date</th>
            <th className="py-5 px-3">Amount </th>
            <th className="py-5 px-3">Refunds</th>
            <th className="py-5 px-3">Fees</th>
            <th className="py-5 px-3">Total</th>
            <th className="py-5 px-3">Payout method</th>
            <th className="py-5 px-3">Status</th>

            <th className="py-5 px-3">Payment Processed</th>
          </tr>
        </thead>
        <tbody className="text-[13px]">
          {payout.map((item, index) => (
            <tr
              key={index}
              className="border-t border-gray-200/80 hover:bg-gray-100 transition"
            >
              <td className="py-4 px-3">{item.payoutDate}</td>
              <td className="py-4 px-3">{item.amount}</td>
              <td className="py-4 px-3 text-red-500">{item.refunds}</td>
              <td className="py-4 px-3 text-red-500">{item.fees}</td>
              <td className="py-4 px-3">{item.total}</td>
              <td className="py-4 px-3">{item.paymentMethod}</td>
              <td className="py-4 px-3">
                <button
                  className={`${
                    item.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
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
  );
};

export default PayoutRequestTable;
