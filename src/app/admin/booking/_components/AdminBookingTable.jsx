import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
// import Link from "next/link";
import { FaEye } from "react-icons/fa";
import BookingDetailsModal from "./BookingDetailsModal";
import { useState } from "react";

const AdminBookingTable = ({
  allData,
  updateBookingStatus,
  pageSize,
  allStatusData,
}) => {
  const {
    currentPage,
    setCurrentPage,
    totalRecords,
    setIsModalOpen,
    isModalOpen,
  } = useAppContext();
  const [bookingDetails, setBookingDetails] = useState();

  const formatBookingTime = (value) => {
    const [date, rest] = value.split(/ (?=\d{2}:\d{2}:\d{2})/);
    return { date, time: rest };
  };
  return (
    <div className=" mb-10">
      <div className=" mb-5">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">#</th>

              <th className="py-5 px-3">Booking Id</th>
              <th className="py-5 px-3">Schedule Time</th>
              <th className="py-5 px-3">Booking Time</th>

              <th className="py-5 px-3 ">User</th>

              <th className="py-5 px-3">Amount</th>
              <th className="py-5 px-3">Payment Status</th>

              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {allData.map((item, index) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{index + 1}</td>
                <td className="py-4 px-3">{item.id}</td>

                <td className="py-4 px-3 whitespace-pre-line">
                  {item.scheduleTime}
                </td>
                <td className="py-4 px-3 whitespace-pre-line">
                  {item.bookingTime}
                </td>

                <td className="py-4 px-3">{item.userName}</td>

                <td className="py-4 px-3 font-medium">{item.amount}</td>

                <td className={`py-4 px-3 font-medium `}>
                  <button
                    className={`${
                      item.paymentStatus === "Completed"
                        ? "text-green-600 bg-green-100 p-2 rounded "
                        : item.paymentStatus === "Pending"
                        ? "text-yellow-600 bg-yellow-100 p-2 rounded"
                        : item.paymentStatus === "Inprogress"
                        ? "text-blue-600 bg-blue-100 p-2 rounded"
                        : "text-red-600 bg-red-100 p-2 rounded"
                    }`}
                  >
                    {item.paymentStatus}
                  </button>
                </td>

                <td className="py-4 px-3 font-medium">
                  <button
                    onClick={() => {
                      setBookingDetails(item);
                      setIsModalOpen(true);
                    }}
                    className="bg-gray-200 text-gray-500 hover:bg-(--primary-blue) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                  >
                    <FaEye size={25} />
                  </button>
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
      {isModalOpen && (
        <BookingDetailsModal
          item={bookingDetails}
          allStatusData={allStatusData}
          updateBookingStatus={updateBookingStatus}
        />
      )}
    </div>
  );
};

export default AdminBookingTable;
