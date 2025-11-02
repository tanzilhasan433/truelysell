"use client";

import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
export const providerEnquiries = [
  {
    id: 1,
    name: "John Smith",
    enquiredService: "Home Cleaning",
    email: "johnsmith@example.com",
    phoneNumber: "+1 202-555-0147",
    date: "2025-09-25",
  },
  {
    id: 2,
    name: "Emily Johnson",
    enquiredService: "Plumbing Repair",
    email: "emilyj@example.com",
    phoneNumber: "+1 303-555-0293",
    date: "2025-09-27",
  },
  {
    id: 3,
    name: "Michael Brown",
    enquiredService: "Electrical Maintenance",
    email: "michaelb@example.com",
    phoneNumber: "+1 415-555-0432",
    date: "2025-09-29",
  },
  {
    id: 4,
    name: "Sophia Davis",
    enquiredService: "Gardening Service",
    email: "sophiad@example.com",
    phoneNumber: "+1 512-555-0654",
    date: "2025-09-30",
  },
  {
    id: 5,
    name: "James Wilson",
    enquiredService: "Carpet Cleaning",
    email: "jamesw@example.com",
    phoneNumber: "+1 617-555-0785",
    date: "2025-10-01",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    enquiredService: "Painting & Decorating",
    email: "oliviam@example.com",
    phoneNumber: "+1 702-555-0842",
    date: "2025-10-02",
  },
  {
    id: 7,
    name: "William Taylor",
    enquiredService: "Pest Control",
    email: "williamt@example.com",
    phoneNumber: "+1 718-555-0931",
    date: "2025-10-03",
  },
  {
    id: 8,
    name: "Ava Anderson",
    enquiredService: "Roof Repair",
    email: "avaa@example.com",
    phoneNumber: "+1 805-555-1012",
    date: "2025-10-04",
  },
  {
    id: 9,
    name: "Daniel Thomas",
    enquiredService: "Appliance Installation",
    email: "danielt@example.com",
    phoneNumber: "+1 917-555-1123",
    date: "2025-10-05",
  },
];

const ProviderEquiriesPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Provider Enquiry</h4>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full  text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">Name</th>
              <th className="py-5 px-3">Enquired Service </th>
              <th className="py-5 px-3">Email</th>
              <th className="py-5 px-3">Phone Number</th>
              <th className="py-5 px-3">Date</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {providerEnquiries.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.name}</td>
                <td className="py-4 px-3">{item.enquiredService}</td>

                <td className="py-4 px-3">{item.email}</td>
                <td className="py-4 px-3">{item.phoneNumber}</td>
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

export default ProviderEquiriesPage;
