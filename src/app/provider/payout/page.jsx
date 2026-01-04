"use client";
import SetPayoutModal from "@/app/provider/payout/_components/SetPayoutModal";
import { useAppContext } from "@/context/AppContext";
import { useProviderPayout } from "@/hooks/provider/useProviderPayout";
import Link from "next/link";
import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaRegFileAlt } from "react-icons/fa";
import PayoutRequestTable from "./_components/PayoutRequestTable";
import PayoutHistory from "./_components/PayoutHistory";

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

const tabs = [
  {
    name: "Payout Request",
    component: <PayoutRequestTable />,
  },
  {
    name: "Payout History",
    component: <PayoutHistory />,
  },
];

const ProviderPayoutPage = () => {
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveData } = useProviderPayout();
  const pageSize = 10;

  const [activeTab, setActiveTab] = useState("Payout Request");

  const ActiveComponent =
    tabs.find((tab) => tab.name === activeTab)?.component || (() => null);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Payout</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="darkButton flex items-center gap-2"
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
                className="p-2 rounded text-white bg-(--dark) text-sm block"
              >
                Transaction
              </Link>
              {card.withdraw && (
                <button className="p-1 rounded text-(--dark) bg-gray-200 text-xs mt-2">
                  {card.withdraw}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <nav className="flex space-x-6 mt-10 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.name
                ? "darkButton"
                : "bg-gray-200 hover:text-white text-gray-700 hover:bg-(--dark) px-4 py-2 rounded "
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="mt-4">{ActiveComponent}</div>

      {isModalOpen && <SetPayoutModal onSubmit={saveData} />}
    </div>
  );
};

export default ProviderPayoutPage;
