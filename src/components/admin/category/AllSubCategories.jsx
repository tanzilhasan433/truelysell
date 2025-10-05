"use client";
import { categories } from "@/data/services";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import ToggleSwitch from "./ToggleSwitch";

const AllSubCategories = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>SUb Categories</h4>
        <button className="bg-[var(--primary-blue)] text-white px-4 py-2 rounded-md flex items-center gap-2">
          <FaPlus size={15} /> Add Sub Category
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">#</th>

              <th className="py-5 px-3">Sub Category</th>
              <th className="py-5 px-3">Sub Category Slug</th>
              <th className="py-5 px-3">SCategory</th>
              <th className="py-5 px-3">Date</th>

              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {categories.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>
                <td className="py-4 px-3 flex items-center gap-2">
                  <img
                    src={item.img}
                    alt={item.subCategory}
                    className="w-8 h-8 rounded object-cover"
                  />
                  {item.category}
                </td>
                <td className="py-4 px-3">{item.subCategory}</td>
                <td className="py-4 px-3">{item.category}</td>
                <td className="py-4 px-3">{item.date}</td>

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
    </div>
  );
};

export default AllSubCategories;
