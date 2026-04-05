"use client";
import { FiEdit } from "react-icons/fi";

import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import DeleteButton from "@/components/shared/DeleteButton";
import ToggleSwitch from "@/components/shared/ToggleSwitch";

const AllCategories = ({
  setAllData,
  allData,
  pageSize,
  handleFeaturedToggle,
}) => {
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
        <table className="w-full max-w-7xl text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Category</th>
              <th className="py-5 px-3">Category Slug</th>
              <th className="py-5 px-3">Featured</th>
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
                <td className="py-4 px-3 flex items-center gap-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/categories/${item.imageUrl}`}
                    alt={item.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                  {item.name}
                </td>

                <td className="py-4 px-3">{item.slug}</td>
                <td className="py-4 px-3 font-medium">
                  <ToggleSwitch
                    initial={item.isFeatured}
                    onChange={(val) => handleFeaturedToggle(item, val)}
                  />
                </td>

                <td className="py-4 px-2 font-medium">
                  <div className=" flex items-center gap-2">
                    {" "}
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
                      endpoint={`categories/delete/${item?.id}`}
                      type="category"
                      onComplete={(status) => {
                        if (status) {
                          setAllData((prev) =>
                            prev.filter((b) => b.id !== item.id),
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
  );
};

export default AllCategories;
