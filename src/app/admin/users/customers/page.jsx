"use client";

import AddUserModal from "@/components/admin/users/AddUserModal";
import { customersData } from "@/data/json/customersdata";
import { useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
const CustomersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestimonial = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Customers</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--primary-blue)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Customer
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Name </th>
              <th className="py-5 px-3">Mobile </th>
              <th className="py-5 px-3">email </th>
              <th className="py-5 px-3">Reg </th>
              <th className="py-5 px-3">last activity</th>
              <th className="py-5 px-3">Status</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {customersData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3 ">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.img}
                      alt={item.customerName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {item.customerName.split("\n")[0]}
                  </div>
                </td>
                <td className="py-4 px-3">{item.mobile}</td>
                <td className="py-4 px-3">
                  {item.customerName.split("\n")[1]}
                </td>
                <td className="py-4 px-3">{item.regDate}</td>
                <td className="py-4 px-3">{item.lastActivity}</td>

                <td
                  className={`py-4 px-3 font-semibold ${
                    item.status == "Active" ? "text-green-700" : "text-blue-700"
                  }`}
                >
                  {item.status}
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
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
        role="customer"
      />
    </div>
  );
};

export default CustomersPage;
