import CustomerWalletComponent from "@/components/customer/wallet/CustomerWalletComponent";
import WalletSummary from "@/components/customer/wallet/WalletSummary";

import { FaPlus } from "react-icons/fa";

const CustomerWalletPage = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h4 className="mb-5"> Wallet</h4>
        <button className="bg-[var(--dark)] text-white px-4 py-2 rounded-md flex items-center gap-2">
          <FaPlus size={15} /> Add wallet
        </button>
      </div>
      <WalletSummary />
      <CustomerWalletComponent />
    </div>
  );
};

export default CustomerWalletPage;
