"use client";
import { walletData } from "@/data/services";

const WalletPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Wallet</h4>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">#</th>

              <th className="py-5 px-3">User Name</th>
              <th className="py-5 px-3">Phone</th>
              <th className="py-5 px-3">Balance</th>

              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {walletData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>
                <td className="py-4 px-3 flex items-center gap-2">
                  <img
                    src={item.img}
                    alt={item.userName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {item.userName.split("\n")[0].trim()}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {item.userName.split("\n")[1].trim()}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-3">{item.phone}</td>
                <td className="py-4 px-3">{item.balance}</td>

                <td className="py-4 px-2 font-medium">
                  <button className="bg-gray-100 text-xs rounded-md text-gray-500 hover:bg-[var(--primary-blue)] hover:text-white p-2  items-center justify-center gap-2">
                    History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletPage;
