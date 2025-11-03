"use client";
import AddCouponModal from "@/components/provider/coupon/AddCouponModal";
import { couponsData } from "@/data/json/coupons";
import { StaffData } from "@/data/json/staffData";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const ProviderCouponsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestimonial = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Coupons</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--dark)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Coupon
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full  text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">Name</th>
              <th className="py-5 px-3">Code </th>
              <th className="py-5 px-3">Type</th>
              <th className="py-5 px-3">Discount</th>
              <th className="py-5 px-3">Limit</th>
              <th className="py-5 px-3">used</th>
              <th className="py-5 px-3">valid Date</th>
              <th className="py-5 px-3">Service name</th>
              <th className="py-5 px-3">Status</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {couponsData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.name}</td>
                <td className="py-4 px-3">{item.code}</td>
                <td className="py-4 px-3">{item.type}</td>
                <td className="py-4 px-3">{item.discount}</td>
                <td className="py-4 px-3">{item.limit}</td>
                <td className="py-4 px-3">{item.used}</td>
                <td className="py-4 px-3">{item.used}</td>
                <td className="py-4 px-3">{item.serviceName}</td>

                <td className="py-4 px-3 font-medium">
                  {" "}
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
      <AddCouponModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
        role=""
      />
    </div>
  );
};

export default ProviderCouponsPage;
