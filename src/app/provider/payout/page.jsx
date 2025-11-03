"use client";
import SetPayoutModal from "@/components/provider/payout/SetPayoutModal";
import { payout } from "@/data/json/payout";
import Link from "next/link";
import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaRegFileAlt } from "react-icons/fa";

import { GoDotFill } from "react-icons/go";

const payoutCards = [
  {
    id: "1",
    status: "Available Payout",
    payout: "$180.00",
    withdraw: "Withdraw",
  },
  {
    id: "2",
    status: "Last Payout",
    payout: "$10.00",
    withdraw: "",
  },
  {
    id: "3",
    status: "Next Payout",
    payout: "$80.00",
    withdraw: "",
  },
];

const ProviderPayoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestimonial = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Payout</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--dark)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <CiSettings size={15} /> Set Payout
        </button>
      </div>
      {/* payout cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {payoutCards.map((card) => (
          <div
            key={card.id}
            className=" lg:h-28 border border-gray-200 shadow  rounded-md flex  justify-between items-center p-4"
          >
            <div className="flex items-center gap-3 ">
              <div className="rounded-full bg-gray-200 p-2 w-12 h-12 flex items-center justify-center">
                <FaRegFileAlt className="text-grya-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.status}</p>
                <h5 className="text-2xl font-semibold">{card.payout}</h5>
              </div>
            </div>
            <div>
              <Link
                href={"/provider/payout/transaction"}
                className="p-2 rounded text-white bg-[var(--dark)] text-sm block"
              >
                Transaction
              </Link>
              {card.withdraw && (
                <button className="p-1 rounded text-[var(--dark)] bg-gray-200 text-xs mt-2">
                  {card.withdraw}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full  text-sm text-left text-gray-600">
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
      <SetPayoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
        role=""
      />
    </div>
  );
};

export default ProviderPayoutPage;
