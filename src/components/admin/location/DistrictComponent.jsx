"use client";

import AddDistrictModal from "@/components/admin/location/AddDistrictModal";
import DeleteButton from "@/components/shared/DeleteButton";
import Pagination from "@/components/shared/Pagination";
import { FiEdit } from "react-icons/fi";
import { FadeLoader } from "react-spinners";

const DistrictComponent = ({
  allData,
  setAllData,
  selectedId,
  handleDistrict,
  setCurrentPage,
  pageSize,
  totalRecords,
  currentPage,
  setIsModalOpen,
  setSelectedId,
  isModalOpen,
  loading,
  allDivisionData,
}) => {
  return (
    <div>
      {/* table */}
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
            {" "}
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
                <tr>
                  <th className="py-5 px-3">#</th>
                  <th className="py-5 px-3">District Name ( English ) </th>
                  <th className="py-5 px-3"> District Name ( Bangla ) </th>
                  <th className="py-5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {allData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-3">{index + 1}</td>

                    <td className="py-4 px-3 ">{item.nameEn}</td>
                    <td className="py-4 px-3 ">{item.nameBn}</td>

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
                          endpoint={`district/delete/${item?.id}`}
                          type="district"
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

      <AddDistrictModal
        isOpen={isModalOpen}
        onSubmit={handleDistrict}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        Id={selectedId}
        allDivisionData={allDivisionData}
      />
    </div>
  );
};

export default DistrictComponent;
