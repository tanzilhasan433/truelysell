import { useAppContext } from "@/context/AppContext";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { CustomersData } from "@/data/json/customer-data";
import CustomerDetails from "./CustomerDetails";
import DeleteButton from "@/components/shared/DeleteButton";
import Pagination from "@/components/shared/Pagination";
import { useState } from "react";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import { baseProviderURL } from "@/services/apiService";

const BookingCustomerTable = ({
  allData,
  setAllData,
  pageSize,
  loading,
  setCustomerId,
  customerData,
}) => {
  const {
    setSelectedId,
    currentPage,
    setCurrentPage,
    totalRecords,
    setIsModalOpen,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
  } = useAppContext();
  // const [bookingCustomerDetails, setBookingCustomerDetails] = useState();

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
                <th className="py-5 px-3">No</th>
                <th className="py-5 px-3">Customer Id</th>
                <th className="py-5 px-3">Cutomer name </th>
                <th className="py-5 px-3">phone </th>

                <th className="py-5 px-3">payments</th>
                <th className="py-5 px-3">Total Booking</th>

                <th className="py-5 px-3">Status</th>

                <th className="py-5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {allData.map((item, indx) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-3">{indx + 1}</td>
                  <td className="py-4 px-3">{item.id}</td>
                  <td className="py-4 px-3 flex items-center gap-2 lg:flex-row flex-col">
                    <img
                      src={`${baseProviderURL}files/provider-customer/${item.profileImageUrl}`}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p>{item.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-3">{item.mobileNumber}</td>

                  <td className="py-4 px-3">{item.payments}</td>
                  <td className="py-4 px-3 font-medium">{item.totalBooking}</td>

                  <td className={`py-4 px-3 font-medium `}>
                    <button
                      className={`${
                        item.status === "Active"
                          ? "text-green-500 bg-green-100 py-1 rounded px-2"
                          : "text-red-500 bg-red-100 px-2 py-1 rounded"
                      }`}
                    >
                      {" "}
                      {item.status}
                    </button>
                  </td>

                  <td className="py-4 px-2 font-medium">
                    <div className=" flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedId(item.id);
                          setIsModalOpen(true);
                        }}
                        className="bg-gray-200 text-gray-500 hover:bg-(--primary) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                      >
                        <FiEdit size={25} />
                      </button>
                      <button
                        onClick={() => {
                          // setBookingCustomerDetails(item);
                          setCustomerId(item.id);
                          setIsDetailsModalOpen(true);
                        }}
                        className="bg-gray-200 text-gray-500 hover:bg-(--primary) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                      >
                        <FaRegEye size={25} />
                      </button>
                      <DeleteButton
                        endpoint={`provider-customer/delete/${item?.id}`}
                        type="customer"
                        onComplete={(status) => {
                          if (status) {
                            setAllData((prev) =>
                              prev.filter((b) => b.id !== item.id),
                            );
                          } else {
                          }
                        }}
                      />
                    </div>
                  </td>
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
      {isDetailsModalOpen && <CustomerDetails item={customerData} />}
    </div>
  );
};

export default BookingCustomerTable;
