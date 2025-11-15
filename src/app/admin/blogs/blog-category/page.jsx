"use client";

import AddBlogCategoryModal from "@/components/admin/blog/AddBlogCategoryModal";
import { blogsData } from "@/data/json/blog_categories";
import { useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const BlogCategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestimonial = (data) => {
    console.log("Form Submitted:", data);
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Blog Category</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Blog Category
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Category </th>
              <th className="py-5 px-3">Language </th>
              <th className="py-5 px-3">Date </th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {blogsData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3 ">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.img}
                      alt={item.category}
                      className="w-8 h-8 rounded object-cover"
                    />
                    {item.category}
                  </div>
                </td>

                <td className="py-4 px-3">{item.language}</td>

                <td className="py-4 px-3 ">{item.date}</td>

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
      <AddBlogCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
      />
    </div>
  );
};

export default BlogCategoriesPage;
