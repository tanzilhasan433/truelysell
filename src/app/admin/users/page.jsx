"use client";

import AddUserModal from "@/components/admin/users/AddUserModal";
import { userData } from "@/data/json/users";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = async (data) => {
    console.log("Form Submitted:", data);
    const payload = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email,
      MobileNo: data.MobileNo,
      Password: data.Password,
      IsActive: Boolean(data.IsActive),
      UserRoles: [
        {
          RoleId: Number(data.RoleId),
        },
      ],
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}users/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(result.message);
          setIsModalOpen(false);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Users</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--primary-blue)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add User
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
              <th className="py-5 px-3">role </th>
              <th className="py-5 px-3">last activity</th>
              <th className="py-5 px-3">created</th>
              <th className="py-5 px-3">Status</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {userData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3 ">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {item.name}
                  </div>
                </td>
                <td className="py-4 px-3">{item.mobile}</td>
                <td className="py-4 px-3">{item.email}</td>
                <td className="py-4 px-3">{item.role}</td>
                <td className="py-4 px-3">{item.lastActivity}</td>

                <td className="py-4 px-3 font-medium">{item.created}</td>
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
        onSubmit={handleAddUser}
        role=""
      />
    </div>
  );
};

export default UsersPage;
