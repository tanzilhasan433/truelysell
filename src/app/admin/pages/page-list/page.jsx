"use client";

import ToggleSwitch from "@/components/admin/category/ToggleSwitch";
import { pagesData } from "@/data/services";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const PageList = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Page List</h4>
        <Link
          href={"/admin/pages/add-page"}
          className="bg-[var(--primary-blue)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Page
        </Link>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Title </th>
              <th className="py-5 px-3">Language </th>
              <th className="py-5 px-3">Location </th>
              <th className="py-5 px-3">Status</th>
              <th className="py-5 px-3">Date</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {pagesData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3">{item.title}</td>
                <td className="py-4 px-3">{item.language}</td>
                <td className="py-4 px-3">{item.location}</td>

                <td className="py-4 px-3 font-medium">
                  <ToggleSwitch
                    initial={item.status}
                    onChange={(val) =>
                      console.log(`Category ${item.id} featured =`, val)
                    }
                  />
                </td>
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

export default PageList;
