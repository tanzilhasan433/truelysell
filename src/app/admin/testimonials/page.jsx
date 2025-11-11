"use client";

import TestimonialModal from "@/components/admin/testimonial/TestimonialModal";
import DeleteButton from "@/components/shared/DeleteButton";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FadeLoader } from "react-spinners";

const TestimonialsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const { loading, setLoading } = useAppContext();
  const pageSize = 10;

  const getTestimonials = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_ADMIN_URL
        }testimonial/getall?PageNumber=${
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
        console.log("Testimonials fetched:", result);
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
    getTestimonials(currentPage);
  }, [currentPage]);

  const handleTestimonial = async (data) => {
    const isEditing = !!selectedId;
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Content", data.Content);
    formData.append("Ratings", Number(data.Ratings));
    formData.append("JobTitle", data.JobTitle);
    formData.append("IsActive", data.IsActive ? "true" : "false");

    if (data.PersonImage) {
      formData.append("PersonImage", data.PersonImage);
    }

    if (isEditing) {
      formData.append("Id", selectedId);
    }

    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}testimonial/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}testimonial/create`;

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
            ? "Testimonial updated successfully"
            : "Testimonial created successfully"
        );
        setIsModalOpen(false);
        setSelectedId(null);
        getTestimonials(currentPage);
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
        <h4>Testimonials</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Testimonial
        </button>
      </div>
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
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
                <tr>
                  <th className="py-5 px-3">#</th>
                  <th className="py-5 px-3">User Name </th>
                  <th className="py-5 px-3">Rating </th>
                  <th className="py-5 px-3">Content </th>
                  <th className="py-5 px-3">Create At</th>
                  <th className="py-5 px-3">Status</th>
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
                        src={`${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/testimonial/${item.imageUrl}`}
                        alt={item.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      {/* <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, index) => (
                          <FaStar
                            key={index}
                            className={`h-4 w-4 ${
                              index < item.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div> */}
                    </td>
                    <td className="py-4 px-3">{item.content}</td>

                    <td className="py-4 px-3 font-medium"></td>
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
                          endpoint={`testimonial/delete/${item?.id}`}
                          type="testimonial"
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
      <div className="overflow-x-auto"></div>
      <TestimonialModal
        isOpen={isModalOpen}
        onSubmit={handleTestimonial}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        testimonialId={selectedId}
      />
    </div>
  );
};

export default TestimonialsPage;
