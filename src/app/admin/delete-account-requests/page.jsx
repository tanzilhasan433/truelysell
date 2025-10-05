"use client";

import { DeleteAccountrequestsdata } from "@/data/json/delete_account_requestsdata";
import { FaRegTrashCan } from "react-icons/fa6";

const DeleteAccountRequestsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Delete Account Request</h4>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Name </th>
              <th className="py-5 px-3">Requisition Date</th>
              <th className="py-5 px-3">Delete Request Date</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {DeleteAccountrequestsdata.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.customer}
                      alt={item.customerName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="">{item.customerName}</p>
                      <p className="">{item.email}</p>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-3 font-medium">{item.dates}</td>

                <td className="py-4 px-3">{item.dates1}</td>

                <td className="py-4 px-2 font-medium">
                  <div className=" flex items-center gap-2">
                    {" "}
                    <button className="bg-gray-200 text-gray-500 hover:bg-red-500 hover:text-white p-2  rounded-full w-7 h-7 flex items-center justify-center gap-2">
                      <FaRegTrashCan />
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

export default DeleteAccountRequestsPage;
