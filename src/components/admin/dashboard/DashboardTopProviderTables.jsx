"use client";

import { dataProviders, dataServices } from "@/data/services";
import { FiArrowRight } from "react-icons/fi";

const DashboardTopProviderTables = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
      {/* Top Services */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200/80">
        <div className="flex justify-between items-center mb-5">
          <h6 className="font-semibold text-gray-800">Top Services</h6>
          <button className="flex items-center text-blue-600 text-sm font-medium hover:underline">
            View All <FiArrowRight className="ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
              <tr>
                <th className="py-5 px-3">#</th>
                <th className="py-5 px-3">Service</th>
                <th className="py-5 px-3">Category</th>
                <th className="py-5 px-3">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {dataServices.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-3">{item.id}</td>
                  <td className="py-4 px-3 flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    {item.name}
                  </td>
                  <td className="py-4 px-3">{item.category}</td>
                  <td className="py-4 px-3 font-medium">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Providers */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200/80">
        <div className="flex justify-between items-center mb-5">
          <h6 className="font-semibold text-gray-800">Top Providers</h6>
          <button className="flex items-center text-blue-600 text-sm font-medium hover:underline">
            View All <FiArrowRight className="ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
              <tr>
                <th className="py-5 px-3">#</th>
                <th className="py-5 px-3">Provider Name</th>
                <th className="py-5 px-3">Email</th>
                <th className="py-5 px-3">Phone</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {dataProviders.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-3">{item.id}</td>
                  <td className="py-4 px-3 flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {item.name}
                  </td>
                  <td className="py-4 px-3">{item.email}</td>
                  <td className="py-4 px-3">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopProviderTables;
