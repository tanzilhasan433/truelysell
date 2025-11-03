import { CiWallet } from "react-icons/ci";

const WalletSummary = () => {
  const stats = [
    { label: "Wallet Balance", value: "$351.4" },
    { label: "Total Credit", value: "$590.40" },
    { label: "Total Debit", value: "$2,288.04" },
    { label: "Taxes", value: "$351.4" },
  ];

  return (
    <div className="mt-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white border border-gray-200/80 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center bg-gray-100 text-gray-600 p-3 rounded-full text-xl">
              <CiWallet />
            </div>
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-lg font-semibold text-gray-800">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="mt-4 bg-white border border-gray-200/80 rounded-xl shadow-sm p-4 flex items-center gap-4">
        <div className="flex items-center justify-center bg-gray-100 text-gray-600 p-3 rounded-full text-xl">
          <CiWallet />
        </div>
        <div>
          <p className="text-sm text-gray-500">Savings</p>
          <p className="text-lg font-semibold text-gray-800">$200.00</p>
        </div>
      </div>
    </div>
  );
};

export default WalletSummary;
