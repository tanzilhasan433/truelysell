"use client";

import ToggleSwitch from "@/components/admin/category/ToggleSwitch";
import AddReviewTypeModal from "@/components/admin/review/AddReviewTypeModal";
import { useAppContext } from "@/context/AppContext";
import { reviewsData } from "@/data/services";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const ReviewTypePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const { loading, setLoading } = useAppContext();
  const pageSize = 10;
  const getFaq = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}faq/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Title&SortDirection=asc&PageSize=${pageSize}`,

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
    getFaq(currentPage);
  }, [currentPage]);

  const handleReviewType = async (data) => {
    const isEditing = !!selectedId;

    const payload = {
      Title: data.Title,
      Details: data.Details,
      Position: data.Position,
      IsActive: data.IsActive,
    };

    if (isEditing) {
      payload.Id = selectedId;
    }

    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}faq/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}faq/create`;

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

      const result = await response.json();

      if (response.ok) {
        toast.success(
          isEditing ? "Faq updated successfully" : "Faq created successfully"
        );
        setIsModalOpen(false);
        setSelectedId(null);
        getFaq(currentPage);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Reviews Type</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Review Type
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Review Type </th>
              <th className="py-5 px-3">Status</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {reviewsData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3">{item.reviewType}</td>

                <td className="py-4 px-3 font-medium">
                  <ToggleSwitch
                    initial={item.status}
                    onChange={(val) =>
                      console.log(`Category ${item.id} featured =`, val)
                    }
                  />
                </td>

                <td className="py-4 px-2 font-medium">
                  <div className=" flex items-center gap-2">
                    {" "}
                    <button className="bg-gray-200 text-gray-500 hover:bg-(--primary-blue) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2">
                      <FiEdit size={25} />
                    </button>
                    <button className="bg-gray-200 text-gray-500 p-2 h-7 w-7 hover:bg-(--primary-blue) hover:text-white  rounded-full flex items-center  justify-center  gap-2">
                      <FaRegTrashCan size={25} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddReviewTypeModal
        isOpen={isModalOpen}
        onSubmit={handleReviewType}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        Id={selectedId}
      />
    </div>
  );
};

export default ReviewTypePage;
