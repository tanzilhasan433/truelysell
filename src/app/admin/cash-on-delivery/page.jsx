"use client";

import { cashOnDeliveryData } from "@/data/json/cash-on-delivery";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const CashOnDeliveryPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Cash On Delivery</h4>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-screen  text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Booking Id</th>

              <th className="py-5 px-3">Service </th>
              <th className="py-5 px-3">Provider Name</th>
              <th className="py-5 px-3">User Name</th>
              <th className="py-5 px-3">Amount</th>
              <th className="py-5 px-3">Status</th>
              <th className="py-5 px-3">Date</th>
              <th className="py-5 px-3">Service Status</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {cashOnDeliveryData.map((item, index) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{index + 1}</td>
                <td className="py-4 px-3">{item.id}</td>
                <td className="py-4 px-3 ">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.serviceImg}
                      alt={item.service}
                      className="w-8 h-8 rounded object-cover"
                    />
                    {item.service}
                  </div>
                </td>
                <td className="py-4 px-3 ">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.providerImg}
                      alt={item.providerName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {item.providerName}
                  </div>
                </td>
                <td className="py-4 px-3 ">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.userImg}
                      alt={item.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {item.userName}
                  </div>
                </td>
                <td className="py-4 px-3">{item.amount}</td>
                <td className="py-4 px-3">{item.status}</td>
                <td className="py-4 px-3">{item.date}</td>
                <td className="py-4 px-2 ">{item.serviceStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashOnDeliveryPage;
