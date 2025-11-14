"use client";

import { reviewsData } from "@/data/services";

const ReviewPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Reviews </h4>
      </div>
      {/* table */}
      <div className="overflow-x-scroll">
        <table className="min-w-screen text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">Date</th>
              <th className="py-5 px-3">Provider</th>
              <th className="py-5 px-3 ">User</th>
              <th className="py-5 px-3">Service</th>

              <th className="py-5 px-3">ratings</th>
              <th className="py-5 px-3">Comments</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {reviewsData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{item.id}</td>
                <td className="py-4 px-3">{item.date}</td>

                <td className="py-4 px-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.providerImg}
                      alt={item.providerName}
                      className="w-8 h-8 rounded object-cover"
                    />
                    {item.providerName}
                  </div>
                </td>

                <td className="py-4 px-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.userImg}
                      alt={item.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {item.userName}
                  </div>
                </td>

                <td className="py-4 px-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.serviceImg}
                      alt={item.serviceName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {item.serviceName}
                  </div>
                </td>

                <td className="py-4 px-3 font-medium">{item.rating}</td>

                <td className="py-4 px-3 font-medium">{item.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewPage;
