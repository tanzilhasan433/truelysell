"use client";

import AddRoleModal from "@/components/admin/users/AddRoleModal";
import { useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { RiLeafLine } from "react-icons/ri";

const rolesData = [
  {
    id: "1",
    role: "Customer",
    created: "30 Sep 2023",
  },
  {
    id: "2",
    role: "Admin",
    created: "27 Sep 2023",
  },
  {
    id: "3",
    role: "Maneger",
    created: "25 Sep 2023",
  },
];
const RolesPermissionsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestimonial = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Roles & Permission</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--primary-blue)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Role
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Name </th>
              <th className="py-5 px-3">Created</th>

              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {rolesData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3 font-medium">{item.role}</td>

                <td className="py-4 px-3">{item.created}</td>

                <td className="py-4 px-2 font-medium">
                  <div className=" flex items-center gap-2">
                    {" "}
                    <button className="bg-gray-200 text-gray-500 hover:bg-[var(--primary-blue)] hover:text-white p-2  rounded-md flex items-center justify-center gap-2">
                      <FiEdit /> Edit role
                    </button>
                    <button className="bg-gray-200 text-gray-500 p-2  hover:bg-[var(--primary-blue)] hover:text-white  rounded-md flex items-center  justify-center  gap-2">
                      <RiLeafLine /> Permissions
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddRoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
      />
    </div>
  );
};

export default RolesPermissionsPage;
