"use client";
import AddOfferModal from "@/components/provider/offers/AddOfferModal";

import { offer } from "@/data/json/offer";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const ProviderOffersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestimonial = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Offers</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--dark)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Offer
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full  text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">Service</th>
              <th className="py-5 px-3">Amount </th>
              <th className="py-5 px-3">Offer</th>
              <th className="py-5 px-3">Offer price</th>
              <th className="py-5 px-3">Date</th>
              <th className="py-5 px-3">End Date</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {offer.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">
                  <div className="flex items-center gap-1">
                    <img src={item.img1} alt="" className="w-8 h-8 rounded" />
                    {item.service}
                  </div>
                </td>
                <td className="py-4 px-3">{item.amount}</td>
                <td className="py-4 px-3">{item.offer}</td>
                <td className="py-4 px-3">{item.offerprice}</td>
                <td className="py-4 px-3">{item.date}</td>
                <td className="py-4 px-3">{item.enddate}</td>

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
      <AddOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
        role=""
      />
    </div>
  );
};

export default ProviderOffersPage;
