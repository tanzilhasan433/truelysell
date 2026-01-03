"use client";
import AddCustomerModal from "@/app/provider/customers/_components/AddCustomerModal";

import BookingCustomerTable from "./_components/BookingCustomerTable";
import { FaPlus } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import { useBookingCustomer } from "@/hooks/provider/useBookingCustomer";

const ProviderCustomersPage = () => {
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveData } = useBookingCustomer();
  const pageSize = 10;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Booking Customers</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--dark) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Customer
        </button>
      </div>
      {/* table */}
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <BookingCustomerTable
          allData={allData}
          setAllData={setAllData}
          pageSize={pageSize}
        />
      )}

      {isModalOpen && <AddCustomerModal onSubmit={saveData} />}
    </div>
  );
};

export default ProviderCustomersPage;
