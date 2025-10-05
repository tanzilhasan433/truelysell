import React from "react";

const AllBooking = ({ data }) => {
  return (
    <div className="overflow-x-scroll">
      <table className="min-w-screen text-sm text-left text-gray-600">
        <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
          <tr>
            <th className="py-5 px-3">#</th>
            <th className="py-5 px-3">Date</th>
            <th className="py-5 px-3">Booking Time</th>
            <th className="py-5 px-3">Provider</th>
            <th className="py-5 px-3 ">User</th>
            <th className="py-5 px-3">Service</th>
            <th className="py-5 px-3">Amount</th>
            <th className="py-5 px-3">Status</th>
            <th className="py-5 px-3">Status</th>
            <th className="py-5 px-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-[13px]">
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-200/80 hover:bg-gray-100 transition"
            >
              <td className="py-4 px-3">{item.id}</td>
              <td className="py-4 px-3">{item.date}</td>
              <td className="py-4 px-3">{item.bookingTime}</td>
              <td className="py-4 px-3">
                <div className="flex items-center gap-2">
                  <img
                    src={item.providerImg}
                    alt={item.provider}
                    className="w-8 h-8 rounded object-cover"
                  />
                  {item.provider}
                </div>
              </td>

              <td className="py-4 px-3">
                <div className="flex items-center gap-2">
                  <img
                    src={item.userImg}
                    alt={item.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {item.user}
                </div>
              </td>

              <td className="py-4 px-3">
                <div className="flex items-center gap-2">
                  <img
                    src={item.serviceImg}
                    alt={item.service}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {item.service}
                </div>
              </td>

              <td className="py-4 px-3 font-medium">{item.amount}</td>

              <td className={`py-4 px-3 font-medium `}>
                <button
                  className={`${
                    item.status === "Completed"
                      ? "text-green-600 bg-green-100 p-2 rounded "
                      : item.status === "Pending"
                      ? "text-yellow-600 bg-yellow-100 p-2 rounded"
                      : item.status === "Inprogress"
                      ? "text-blue-600 bg-blue-100 p-2 rounded"
                      : "text-red-600 bg-red-100 p-2 rounded"
                  }`}
                >
                  {item.status}
                </button>
              </td>
              <td className="py-4 px-3 font-medium">{item.createdAt}</td>

              <td className="py-4 px-2 font-medium">
                <select
                  //   id="category"
                  //   {...register("category")}
                  className=" rounded-md text-gray-600 text-xs border border-gray-300 p-1  focus:outline-none "
                >
                  <option value="" className="">
                    Select Status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="inprogress">Inprogress</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBooking;
