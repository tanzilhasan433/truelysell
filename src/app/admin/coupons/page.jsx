"use client";

import { couponsData } from "@/data/json/coupons";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const CouponsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Coupons</h4>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-screen text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Name </th>
              <th className="py-5 px-3">Code</th>
              <th className="py-5 px-3">Type</th>
              <th className="py-5 px-3">Discount</th>
              <th className="py-5 px-3">limit</th>
              <th className="py-5 px-3">used</th>
              <th className="py-5 px-3">valid date</th>
              <th className="py-5 px-3">service name</th>
              <th className="py-5 px-3">status</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {couponsData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>
                <td className="py-4 px-3">
                  {}
                  {item.name}
                </td>

                <td className="py-4 px-3 font-medium">{item.code}</td>

                <td className="py-4 px-3">{item.type}</td>
                <td className="py-4 px-3">{item.discount}</td>
                <td className="py-4 px-3">{item.limit}</td>
                <td className="py-4 px-3">{item.used}</td>
                <td className="py-4 px-3">{item.validDate}</td>
                <td className="py-4 px-3">{item.serviceName}</td>
                <td
                  className={`py-4 px-3 font-medium ${
                    item.status === "Action"
                      ? "text-green-500"
                      : "text-blue-500"
                  } `}
                >
                  {item.status}
                </td>

                <td className="py-4 px-2 font-medium">
                  <div className=" flex items-center gap-2">
                    {" "}
                    <button className="bg-gray-200 text-gray-500 hover:bg-[var(--primary-blue)] hover:text-white p-2  rounded-full w-7 h-7 flex items-center justify-center gap-2">
                      <FaRegTrashCan />
                    </button>
                    <button className="bg-gray-200 text-gray-500 hover:bg-[var(--primary-blue)] hover:text-white p-2  rounded-full w-7 h-7 flex items-center justify-center gap-2">
                      <FiEdit />
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

export default CouponsPage;
