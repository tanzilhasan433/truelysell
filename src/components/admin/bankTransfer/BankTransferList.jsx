import React, { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";

const BankTransferList = ({ data }) => {
  const [open, setOpen] = useState(null);
  const bankTrasnferAction = (id) => {
    setOpen(open === id ? null : id);
  };
  return (
    <div className="overflow-x-scroll">
      <table className="min-w-screen text-sm text-left text-gray-600">
        <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
          <tr>
            <th className="py-5 px-3">#</th>
            <th className="py-5 px-3">Service</th>
            <th className="py-5 px-3">Customer</th>
            <th className="py-5 px-3">Receipt</th>
            <th className="py-5 px-3 ">Description</th>
            <th className="py-5 px-3">Date</th>
            <th className="py-5 px-3">Status</th>
            <th className="py-5 px-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-[13px]">
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-200/80 hover:bg-gray-100 transition"
            >
              <td className="py-4 px-3">{item.id}</td>

              <td className="py-4 px-3">
                <div className="flex items-center gap-2">
                  <img
                    src={item.img1}
                    alt={item.service}
                    className="w-8 h-8 rounded object-cover"
                  />
                  {item.service}
                </div>
              </td>

              <td className="py-4 px-3">
                <div className="flex items-center gap-2">
                  <img
                    src={item.img2}
                    alt={item.customer}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {item.customer}
                </div>
              </td>

              <td className="py-4 px-3">
                <div className="flex items-center gap-2">
                  <img
                    src={item.img3}
                    alt={item.receipt}
                    className="w-8 h-8 rounded object-cover"
                  />
                  {item.receipt}
                </div>
              </td>

              <td className="py-4 px-3 font-medium">{item.description}</td>
              <td className="py-4 px-3 font-medium">{item.date}</td>

              <td className={`py-4 px-3 font-medium `}>
                <button
                  className={`${
                    item.status === "Successful"
                      ? "text-green-600 bg-green-100 p-2 rounded "
                      : item.status === "Pending"
                      ? "text-yellow-600 bg-yellow-100 p-2 rounded"
                      : item.status === "Approved"
                      ? "text-blue-600 bg-blue-100 p-2 rounded"
                      : "text-red-600 bg-red-100 p-2 rounded"
                  }`}
                >
                  {item.status}
                </button>
              </td>

              <td className="py-4 px-2 font-medium relative">
                <button
                  onClick={() => bankTrasnferAction(item.id)}
                  className="bg-gray-200 text-gray-800 p-2 h-7 w-7 hover:bg-[var(--primary-blue)] hover:text-white  rounded-full flex items-center  justify-center  gap-2"
                >
                  <IoEllipsisVertical />
                </button>
                {open === item.id && (
                  <div className="z-50  right-1 mt-2 absolute shadow-lg border border-gray-200/80 rounded-md bg-white p-2 text-gray-600 flex flex-col gap-2  ">
                    <button className="hover:text-[var(--primary-blue)]">
                      Transfer view
                    </button>
                    <button className="hover:text-[var(--primary-blue)]">
                      Transfer edit
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankTransferList;
