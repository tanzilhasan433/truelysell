"use client";

import TestimonialModal from "@/components/admin/testimonial/TestimonialModal";
import { testimonialsData } from "@/data/json/testimonials";
import { useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const TestimonialsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestimonial = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Testimonials</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[var(--primary-blue)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Testimonial
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
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
            {testimonialsData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3 flex items-center gap-2">
                  <img
                    src={item.img}
                    alt={item.userName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {item.userName.split("\n")[0].trim()}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {item.userName.split("\n")[1].trim()}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-3">
                  {" "}
                  <div className="flex items-center">
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
                  </div>
                </td>
                <td className="py-4 px-3">{item.content}</td>

                <td className="py-4 px-3 font-medium">{item.createAt}</td>
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
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
      />
    </div>
  );
};

export default TestimonialsPage;
