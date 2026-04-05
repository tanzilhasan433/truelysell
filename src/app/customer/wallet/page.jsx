"use client";

import { useAppContext } from "@/context/AppContext";
import { useAdminWallet } from "@/hooks/customer/useCustomerWallet";

import { FaPlus } from "react-icons/fa";
import AddCutomerWalletModal from "./_components/AddCutomerWalletModal";
import WalletSummary from "./_components/WalletSummary";
import CustomerWalletComponent from "./_components/CustomerWalletComponent";

const CustomerWalletPage = () => {
  const pageSize = 10;
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveWallet } = useAdminWallet();
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h4 className="mb-5"> Wallet</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--dark) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Wallet
        </button>
      </div>
      <WalletSummary />
      <CustomerWalletComponent />

      {isModalOpen && <AddCutomerWalletModal onSubmit={saveWallet} />}
    </div>
  );
};

export default CustomerWalletPage;
