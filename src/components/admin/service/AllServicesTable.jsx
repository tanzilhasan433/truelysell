import { dataServices } from "@/data/services";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const AllServicesTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
          <tr>
            <th className="py-5 px-3">#</th>
            <th className="py-5 px-3">Service</th>
            <th className="py-5 px-3">Category</th>
            <th className="py-5 px-3">Sub Category</th>
            <th className="py-5 px-3">Price</th>
            <th className="py-5 px-3">Duration</th>
            <th className="py-5 px-3">Status</th>
            <th className="py-5 px-3">Created By</th>
            <th className="py-5 px-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-[13px]">
          {dataServices.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-200/80 hover:bg-gray-100 transition"
            >
              <td className="py-4 px-3">{item.id}</td>
              <td className="py-4 px-3 flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 rounded object-cover"
                />
                {item.name}
              </td>
              <td className="py-4 px-3">{item.category}</td>
              <td className="py-4 px-3">{item.subCategory}</td>
              <td className="py-4 px-3 font-medium">{item.amount}</td>
              <td className="py-4 px-3 font-medium">{item.duration}</td>
              <td className={`py-4 px-3 font-medium `}>
                <button
                  className={`${
                    item.status === "Active"
                      ? "text-green-600 bg-green-100 p-2 rounded "
                      : item.status === "Pending"
                      ? "text-yellow-600 bg-yellow-100 p-2 rounded"
                      : item.status === "Inactive"
                      ? "text-blue-600 bg-blue-100 p-2 rounded"
                      : "text-red-600 bg-red-100 p-2 rounded"
                  }`}
                >
                  {" "}
                  {item.status}
                </button>
              </td>
              <td className="py-4 px-3 flex items-center gap-2">
                <img
                  src={item.createdByImg}
                  alt={item.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {item.createdByName}
              </td>
              <td className="py-4 px-2 font-medium">
                <div className=" flex items-center gap-2">
                  {" "}
                  <button className="bg-green-100 text-green-500 p-2 rounded-md flex items-center gap-2">
                    <FiEdit size={15} /> Edit
                  </button>
                  <button className="bg-red-100 text-red-500 p-2 rounded-md flex items-center gap-2">
                    <FaRegTrashCan size={15} /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllServicesTable;
