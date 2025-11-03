"use client";

import { useState } from "react";
import { banktransfer } from "@/data/services";
import BankTransferList from "@/components/admin/bankTransfer/BankTransferList";

const pendingData = banktransfer.filter(
  (booking) => booking.status === "Pending"
);
const approvedData = banktransfer.filter(
  (booking) => booking.status === "Approved"
);
const completedData = banktransfer.filter(
  (booking) => booking.status === "Successful"
);
const rejectedData = banktransfer.filter(
  (booking) => booking.status === "Rejected"
);

const tabs = [
  { name: "All list", component: <BankTransferList data={banktransfer} /> },
  { name: "Approved", component: <BankTransferList data={approvedData} /> },
  { name: "Pending", component: <BankTransferList data={pendingData} /> },
  {
    name: "Successful",
    component: <BankTransferList data={completedData} />,
  },
  {
    name: "Rejected list",
    component: <BankTransferList data={rejectedData} />,
  },
];

const BankTransferPage = () => {
  const [activeTab, setActiveTab] = useState("All list");

  // Find the current tab’s component
  const ActiveComponent =
    tabs.find((tab) => tab.name === activeTab)?.component || (() => null);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4>Bank Transfer</h4>
      </div>
      {/* Tab Navigation */}
      <nav className="flex space-x-6 border-b  border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.name
                ? "text-[var(--primary-blue)]"
                : "text-gray-600 hover:text-[var(--primary-blue)]"
            }`}
          >
            {tab.name}
            {activeTab === tab.name && (
              <span className="absolute left-0 -bottom-[1px] w-full h-0.5 bg-[var(--primary-blue)] rounded"></span>
            )}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="mt-4">{ActiveComponent}</div>
    </div>
  );
};

export default BankTransferPage;
