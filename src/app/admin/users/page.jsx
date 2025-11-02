"use client";

import AddUserModal from "@/components/admin/users/AddUserModal";
import DeleteButton from "@/components/shared/DeleteButton";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FadeLoader } from "react-spinners";

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { loading, setLoading } = useAppContext();
  const [roles, setRoles] = useState();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getRoles = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getroles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();

        setRoles(result.data);
      } else {
        const errorData = await response.json();
      }
    } catch (error) {}
  };
  useEffect(() => {
    getRoles();
  }, []);

  const getUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}users/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=FirstName&SortDirection=asc&PageSize=${pageSize}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();

        setAllData(result?.data);
        setTotalRecords(result?.numberOfRecords || 0);

        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllData([]);
        setTotalRecords(0);
      }
    } catch (error) {
      setAllData([]);
      setLoading(false);
      setTotalRecords(0);
    }
  };
  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const handleAddUser = async (data) => {
    const isEditing = !!selectedUserId;
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
      ...(isEditing && { Id: selectedUserId }),
    };

    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}users/update/${selectedUserId}`
      : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}users/create`;

    const method = isEditing ? "PUT" : "POST";
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const result = await response.json();

        if (result.error) {
          toast.error(
            result.error ||
              (isEditing ? "Failed to update user" : "Failed to create user")
          );
        } else {
          toast.success(
            result.message ||
              (isEditing
                ? "User updated successfully"
                : "User created successfully")
          );
          setIsModalOpen(false);
          setSelectedUserId(null);
          getUsers(currentPage);
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

      {loading ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#4c40ed" />
        </div>
      ) : allData && allData.length < 0 ? (
        <div className="p-6 text-center text-gray-500">
          <p className="text-lg">No data Found</p>
        </div>
      ) : (
        <div className=" mb-10">
          <div className="overflow-x-auto mb-5">
            <table className="w-full min-w-screen text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
                <tr>
                  <th className="py-5 px-3">#</th>
                  <th className="py-5 px-3">Name </th>
                  <th className="py-5 px-3">Mobile </th>
                  <th className="py-5 px-3">email </th>
                  <th className="py-5 px-3">role </th>
                  <th className="py-5 px-3">created</th>
                  <th className="py-5 px-3">Status</th>
                  <th className="py-5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {allData &&
                  allData.map((item, inx) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                    >
                      <td className="py-4 px-3">{inx}</td>

                      <td className="py-4 px-3 ">
                        <div className="flex items-center gap-2 lg:flex-row flex-col">
                          {item.name}
                        </div>
                      </td>
                      <td className="py-4 px-3">{item.mobileNo}</td>
                      <td className="py-4 px-3">{item.email}</td>
                      <td className="py-4 px-3">{item.role}</td>

                      <td className="py-4 px-3 font-medium">
                        {item.createdDate}
                      </td>
                      <td
                        className={`py-4 px-3 font-semibold ${
                          item.status == "Active"
                            ? "text-green-700"
                            : "text-blue-700"
                        }`}
                      >
                        {item.status}
                      </td>
                      <td className="py-4 px-2 font-medium">
                        <div className=" flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedUserId(item.id);
                              setIsModalOpen(true);
                            }}
                            className="bg-gray-200 text-gray-500 hover:bg-[var(--primary-blue)] hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                          >
                            <FiEdit size={25} />
                          </button>

                          <DeleteButton
                            endpoint={`users/delete/${item?.id}`}
                            type="user"
                            onComplete={(status) => {
                              if (status) {
                                setAllData((prev) =>
                                  prev.filter((b) => b.id !== item.id)
                                );
                              } else {
                              }
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalRecords={totalRecords}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUserId(null);
        }}
        onSubmit={handleAddUser}
        roles={roles}
        userId={selectedUserId}
      />
    </div>
  );
};

export default UsersPage;
