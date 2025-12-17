"use client";

import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { useAdminReviews } from "@/hooks/admin/useAdminReviews";

const ReviewPage = () => {
  const { loading, currentPage, totalRecords, setCurrentPage } =
    useAppContext();
  const { allData } = useAdminReviews();
  const pageSize = 10;

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Reviews </h4>
      </div>
      {/* table */}
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <div className=" mb-10">
          <div className=" mb-5">
            <table className=" text-sm text-left text-gray-600">
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
                {allData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-3">{index + 1}</td>

                    <td className="py-4 px-3 ">{item.date}</td>

                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        {item.provider}
                      </div>
                    </td>

                    <td className="py-4 px-3">{item.customerName}</td>

                    <td className="py-4 px-3">{item.serviceName}</td>

                    <td className="py-4 px-3 font-medium">{item.rating}</td>

                    <td className="py-4 px-3 font-medium">
                      <p className="text-wrap">{item.comment}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalRecords={totalRecords}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
