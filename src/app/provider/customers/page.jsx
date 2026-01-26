"use client";
import AddCustomerModal from "@/app/provider/customers/_components/AddCustomerModal";

import BookingCustomerTable from "./_components/BookingCustomerTable";
import { FaPlus } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { useBookingCustomer } from "@/hooks/provider/useBookingCustomer";
import BookingCustomerOverview from "./_components/BookingCustomerOverview";
import BookingCustomerReview from "./_components/BookingCustomerReview";
import { useState } from "react";

const ProviderCustomersPage = () => {
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const {
    allData,
    setAllData,
    saveData,
    overview,
    setCustomerId,
    customerData,
  } = useBookingCustomer();
  const [activeTab, setActiveTab] = useState("Overview");
  const pageSize = 10;

  const tabs = [
    {
      name: "Overview",
      component: <BookingCustomerOverview overview={overview} />,
    },
    {
      name: "Booking",
      component: (
        <BookingCustomerTable
          allData={allData}
          setAllData={setAllData}
          pageSize={pageSize}
          loading={loading}
          setCustomerId={setCustomerId}
          customerData={customerData}
        />
      ),
    },
    // {
    //   name: "Reviews",
    //   component: (
    //     <BookingCustomerReview
    //       allData={allData}
    //       pageSize={pageSize}
    //       loading={loading}
    //     />
    //   ),
    // },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.name === activeTab)?.component || (() => null);
  return (
    <div>
      <div className="flex items-center justify-between  mb-4">
        <h4 className="">Booking Customers</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--dark) text-white px-4 py-2 rounded-md flex items-center gap-2 "
        >
          <FaPlus size={15} /> Add Customer
        </button>
      </div>

      <nav className="flex flex-wrap  mt-10 gap-2 mb-5">
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

      {isModalOpen && <AddCustomerModal onSubmit={saveData} />}
    </div>
  );
};

export default ProviderCustomersPage;
