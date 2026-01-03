import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { StaffData } from "@/data/json/staffData";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import DeleteButton from "@/components/shared/DeleteButton";
import StaffDetailsModal from "./StaffDetailsModal";

const ProviderStaffsTable = ({ allData, setAllData, pageSize }) => {
  const {
    setSelectedId,
    currentPage,
    setCurrentPage,
    totalRecords,
    setIsModalOpen,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
  } = useAppContext();
  const [staffDetails, setStaffDetails] = useState();

  return (
    <>
      <div className="overflow-x-auto">
        <table className="max-w-7xl w-full   text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3"> Id</th>
              <th className="py-5 px-3"> name </th>
              <th className="py-5 px-3">Created On</th>
              <th className="py-5 px-3">No of services</th>
              <th className="py-5 px-3">Total Booking</th>
              <th className="py-5 px-3">Status</th>

              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {StaffData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.staffId}</td>
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
                <td className="py-4 px-3">{item.createdOn}</td>
                <td className="py-4 px-3">{item.noOfServices}</td>
                <td className="py-4 px-3 font-medium">{item.totalBookings}</td>
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
                    <button
                      onClick={() => {
                        setSelectedId(item.id);
                        setIsModalOpen(true);
                      }}
                      className="bg-gray-200 text-gray-500 hover:bg-(--primary) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                    >
                      <FiEdit size={25} />
                    </button>
                    <button
                      onClick={() => {
                        setStaffDetails(item);
                        setIsDetailsModalOpen(true);
                      }}
                      className="bg-gray-200 text-gray-500 hover:bg-(--primary) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                    >
                      <FaRegEye size={25} />
                    </button>
                    <DeleteButton
                      endpoint={`staff/delete/${item?.id}`}
                      type="service man"
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
      {isDetailsModalOpen && <StaffDetailsModal item={staffDetails} />}
    </>
  );
};

export default ProviderStaffsTable;
