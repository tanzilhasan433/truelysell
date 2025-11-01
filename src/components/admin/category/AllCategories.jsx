"use client";

import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import ToggleSwitch from "./ToggleSwitch";
import AddCategoryModal from "./AddCategoryModal";
import Pagination from "@/components/shared/Pagination";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import DeleteButton from "@/components/shared/DeleteButton";

const AllCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { loading, setLoading } = useAppContext();
  const [selectedId, setSelectedId] = useState(null);

  const getCategories = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}categories/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Name&SortDirection=asc&PageSize=${pageSize}`,

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
    getCategories(currentPage);
  }, [currentPage]);

  const handleCategories = async (data) => {
    const isEditing = !!selectedId;
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Slug", data.slug);
    formData.append("IsFeatured", data.IsFeatured ? "true" : "false");

    if (data.image) {
      formData.append("CategoryImage", data.image);
    }
    if (data.icon) {
      formData.append("CategoryIcon", data.icon);
    }

    if (isEditing) {
      formData.append("Id", selectedId);
    }

    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}categories/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}categories/create`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          isEditing
            ? "Category updated successfully"
            : "Category created successfully"
        );
        setIsModalOpen(false);
        setSelectedId(null);
        getCategories(currentPage);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFeaturedToggle = async (item, value) => {
    try {
      const formData = new FormData();
      formData.append("Id", item.id);
      formData.append("Name", item.name);
      formData.append("Slug", item.slug);
      formData.append("IsFeatured", value ? "true" : "false");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}categories/update/${item.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Category updated successfully");

        setAllData((prev) =>
          prev.map((cat) =>
            cat.id === item.id ? { ...cat, isFeatured: value } : cat
          )
        );
      } else {
        toast.error(result?.message || "Failed to update");
      }
    } catch (error) {
      toast.error("An error occurred while updating");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Categories</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--primary-blue)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Category
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
            <table className="w-full text-sm text-left text-gray-600">
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
                          className="bg-gray-200 text-gray-500 hover:bg-[var(--primary-blue)] hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                        >
                          <FiEdit size={25} />
                        </button>
                        <DeleteButton
                          endpoint={`categories/delete/${item?.id}`}
                          type="category"
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

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        onSubmit={handleCategories}
        CategoryId={selectedId}
      />
    </div>
  );
};

export default AllCategories;
