import DeleteButton from "@/components/shared/DeleteButton";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiLeafLine } from "react-icons/ri";

const RolesTable = ({ allData, setAllData, pageSize }) => {
  const {
    setSelectedId,
    currentPage,
    setCurrentPage,
    totalRecords,
    setIsModalOpen,
  } = useAppContext();

  return (
    <div className=" mb-10">
      <div className="overflow-x-auto mb-5">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">Id</th>
              <th className="py-5 px-3">Name </th>
              <th className="py-5 px-3">Status</th>

              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {allData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3 font-medium">{item.name}</td>

                <td className="py-4 px-3">{item.status}</td>

                <td className="py-4 px-2 font-medium">
                  <div className=" flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedId(item.id);
                        setIsModalOpen(true);
                      }}
                      className="bg-gray-200 text-gray-500 hover:bg-(--primary-blue) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                    >
                      <FiEdit size={25} />
                    </button>
                    <DeleteButton
                      endpoint={`roles/delete/${item?.id}`}
                      type="role"
                      onComplete={(status) => {
                        if (status) {
                          setAllData((prev) =>
                            prev.filter((b) => b.id !== item.id)
                          );
                        } else {
                        }
                      }}
                    />
                    <button className="bg-gray-200 text-gray-500 p-2  hover:bg-(--primary-blue) hover:text-white  rounded-md flex items-center  justify-center  gap-2">
                      <RiLeafLine /> Permissions
                    </button>
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
  );
};

export default RolesTable;
