import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

const AdminBookingTable = ({
  allData,
  updateBookingStatus,
  pageSize,
  allStatusData,
}) => {
  const { currentPage, setCurrentPage, totalRecords } = useAppContext();
  return (
    <div className=" mb-10">
      <div className="overflow-x-auto mb-5">
        <table className="min-w-screen text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
            <tr>
              <th className="py-5 px-3">#</th>

              <th className="py-5 px-3">Booking Id</th>
              <th className="py-5 px-3">Schedule Time</th>
              <th className="py-5 px-3">Booking Time</th>
              <th className="py-5 px-3">Provider</th>
              <th className="py-5 px-3 ">User</th>
              <th className="py-5 px-3">Service</th>
              <th className="py-5 px-3">Amount</th>
              <th className="py-5 px-3">Payment Status</th>
              <th className="py-5 px-3">payment Date</th>
              <th className="py-5 px-3">Booking View</th>
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

                <td className="py-4 px-3">{item.scheduleTime}</td>
                <td className="py-4 px-3">{item.bookingTime}</td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-2">
                    {item.providerName}
                  </div>
                </td>

                <td className="py-4 px-3">{item.userName}</td>

                <td className="py-4 px-3">{item.serviceName}</td>

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
                <td className="py-4 px-3 font-medium">{item.paymentDate}</td>
                <td className="py-4 px-3 font-medium">
                  <Link
                    href={`/admin/booking/view?id=${item.id}`}
                    className="text-sm underline text-blue-600"
                  >
                    View Details
                  </Link>
                </td>

                <td className="py-4 px-2 font-medium">
                  <select
                    onChange={(e) =>
                      updateBookingStatus(item.id, Number(e.target.value))
                    }
                    className=" rounded-md text-gray-600 text-xs border border-gray-300 p-1  focus:outline-none "
                  >
                    <option value="" className="">
                      Select Status
                    </option>
                    {allStatusData &&
                      allStatusData.length > 0 &&
                      allStatusData.map((statusItem) => (
                        <option
                          key={statusItem.id}
                          value={statusItem.id}
                          selected={statusItem.id === item.statusId}
                        >
                          {statusItem.name}
                        </option>
                      ))}
                  </select>
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
  );
};

export default AdminBookingTable;
