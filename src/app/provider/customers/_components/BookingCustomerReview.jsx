import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const BookingCustomerReview = ({ allData, pageSize, loading }) => {
  const { currentPage, setCurrentPage, totalRecords } = useAppContext();
  return (
    <div>
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <div className="overflow-x-auto mb-10">
          <table className="max-w-7xl w-full  text-sm text-left text-gray-600">
            <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
              <tr>
                <th className="py-5 px-3">Booking Id</th>
                <th className="py-5 px-3">Booking Date</th>
                <th className="py-5 px-3">Rating</th>
                <th className="py-5 px-3">Review</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {allData.map((item, inx) => (
                <tr
                  key={inx + 1}
                  className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-3"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default BookingCustomerReview;
