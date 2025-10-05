"use client";
import AddCustomerModal from "@/components/provider/customer/AddCustomerModal";
import { CustomersData } from "@/data/json/customer-data";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const ProviderCustomersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestimonial = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Customers</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--dark)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Customer
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto my-10">
        <table className="w-full min-w-screen text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">Customer Id</th>
              <th className="py-5 px-3">Cutomer name </th>
              <th className="py-5 px-3">phone </th>
              <th className="py-5 px-3">Created On</th>
              <th className="py-5 px-3">payments</th>
              <th className="py-5 px-3">Total Booking</th>
              <th className="py-5 px-3">last Booking</th>
              <th className="py-5 px-3">Status</th>

              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {CustomersData.map((item) => (
              <tr
                key={item.customerId}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.customerId}</td>
                <td className="py-4 px-3 flex items-center gap-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p>{item.email}</p>
                  </div>
                </td>
                <td className="py-4 px-3">{item.phone}</td>
                <td className="py-4 px-3">{item.createdOn}</td>
                <td className="py-4 px-3">{item.payments}</td>
                <td className="py-4 px-3 font-medium">{item.totalBooking}</td>
                <td className="py-4 px-3 font-medium">{item.lastBooking}</td>
                <td className={`py-4 px-3 font-medium `}>
                  <button
                    className={`${
                      item.status === "Active"
                        ? "text-green-500 bg-green-100 py-1 rounded px-2"
                        : "text-red-500 bg-red-100 px-2 py-1 rounded"
                    }`}
                  >
                    {" "}
                    {item.status}
                  </button>
                </td>

                <td className="py-4 px-2 font-medium">
                  <div className=" flex items-center gap-2">
                    {" "}
                    <button className="bg-gray-200 text-gray-500 hover:bg-[var(--primary-blue)] hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2">
                      <FiEdit size={25} />
                    </button>
                    <button className="bg-gray-200 text-gray-500 p-2 h-7 w-7 hover:bg-[var(--primary-blue)] hover:text-white  rounded-full flex items-center  justify-center  gap-2">
                      <FaRegTrashCan size={25} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
        role=""
      />
    </div>
  );
};

export default ProviderCustomersPage;
